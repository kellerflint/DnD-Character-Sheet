#!/usr/bin/env bash

set -euo pipefail

LOG_PREFIX="[deploy]"

log() {
   echo -e "$LOG_PREFIX $1"
}

require_root() {
   if [[ $EUID -ne 0 ]]; then
      echo "This script must be run as root (try: sudo $0 <repo-url> <app-dir> [branch])."
      exit 1
   fi
}

usage() {
   cat <<'EOF'
Usage: deploy-docker.sh <repo-url> [target-directory] [branch]

Arguments:
  repo-url          Git repository URL to clone (required)
  target-directory  Directory to clone to (default: /opt/dnd-character-sheet)
  branch            Git branch or tag to deploy (default: main)

Environment:
  JWT_SECRET        Optional. If not provided, a new secret will be generated.

Example:
  sudo ./deploy-docker.sh https://github.com/example/DnD-Character-Sheet.git /opt/dnd-character-sheet main
EOF
}

update_system_packages() {
   log "Updating package index..."
   export DEBIAN_FRONTEND=noninteractive
   apt-get update -y
   log "Upgrading installed packages..."
   apt-get upgrade -y
}

install_prerequisites() {
   log "Installing prerequisite packages..."
   apt-get install -y ca-certificates curl gnupg lsb-release git software-properties-common openssl
}

install_docker() {
   if command -v docker >/dev/null 2>&1; then
      log "Docker already installed; skipping."
      return
   fi

   log "Configuring Docker repository..."
   install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   chmod a+r /etc/apt/keyrings/docker.gpg

   local codename
   codename="$(. /etc/os-release && echo "$VERSION_CODENAME")"
   echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
$codename stable" >/etc/apt/sources.list.d/docker.list

   log "Installing Docker Engine and Docker Compose..."
   apt-get update -y
   apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
}

enable_docker_service() {
   log "Enabling Docker service to start on boot..."
   systemctl enable docker
   systemctl start docker
}

clone_repository() {
   local repo_url="$1"
   local target_dir="$2"
   local branch="$3"

   if [[ -d "$target_dir/.git" ]]; then
      log "Repository already present. Fetching latest changes..."
      git -C "$target_dir" fetch origin "$branch"
      git -C "$target_dir" checkout "$branch"
      git -C "$target_dir" pull origin "$branch"
   else
      log "Cloning repository into $target_dir..."
      git clone --branch "$branch" --depth 1 "$repo_url" "$target_dir"
   fi
}

ensure_jwt_secret() {
   local target_dir="$1"
   local env_file="$target_dir/.env"

   if [[ -f "$env_file" ]]; then
      log "Environment file already exists at $env_file."
      return
   fi

   local secret="${JWT_SECRET:-}"
   if [[ -z "$secret" ]]; then
      log "Generating JWT secret..."
      secret="$(openssl rand -hex 32)"
   fi

   cat >"$env_file" <<EOF
JWT_SECRET=$secret
EOF
   log "Created environment file at $env_file."
}

run_compose() {
   local target_dir="$1"
   log "Building and starting containers..."
   (cd "$target_dir" && docker compose up --build -d)
}

print_summary() {
   local target_dir="$1"
   local host_ip
   host_ip="$(hostname -I 2>/dev/null | awk '{print $1}')"

   cat <<EOF

Deployment complete!
- Repository: $target_dir
- Frontend:  http://${host_ip:-<vm-ip>}:8080
- Backend:   http://${host_ip:-<vm-ip>}:5000

Use 'docker compose ps' inside $target_dir to view service status.
EOF
}

main() {
   if [[ $# -lt 1 ]]; then
      usage
      exit 1
   fi

   require_root

   local repo_url="$1"
   local target_dir="${2:-/opt/dnd-character-sheet}"
   local branch="${3:-main}"

   update_system_packages
   install_prerequisites
   install_docker
   enable_docker_service
   clone_repository "$repo_url" "$target_dir" "$branch"
   ensure_jwt_secret "$target_dir"
   run_compose "$target_dir"
   print_summary "$target_dir"
}

main "$@"
