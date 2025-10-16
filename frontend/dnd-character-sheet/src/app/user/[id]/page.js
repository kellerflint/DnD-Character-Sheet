// Layout Page for Admin
import Access from "../../../components/Access"
import { useEffect } from 'react';

import { VM_IP } from "../../../../vm_ip";

export default function UserPage(user) {
    [viewperms, setViewperms] = useState(false);

    useEffect(() => {
        async function checkUser() {
            const { username, password } = user;
            const resp = await fetch(`${VM_IP}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({username: username, password: password})
        });
        }
        checkUser(user);
    });

    return (
        <div>
            <h2>User Access Denied</h2>
            <p>You do not have permission to view this page.</p>
        </div>
    );
}

