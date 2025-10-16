// Layout Page for Admin
'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'
import Access from "../../../components/Access"
import { VM_IP } from "../../../../vm_ip";

export default function UserPage() {
    const params = useParams();
    const usernameFromUrl = params.username;

    const [viewPerms, setViewPerms] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedInUser, setLoggedInUser] = userState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setLoggedInUser(user);

            if (user.username === usernameFromUrl) {
                setViewPerms(true);
            }
        }

        fetchUserData();
    }, [usernameFromUrl]);

    const fetchUserData = async () => {
        try {
            const resp = await fetch(`${VM_IP}/user/${usernameFromUrl}`);

            if (!resp.ok) {
                throw new Error('User not found')
            }

            const data = await resp.json();

            setUserData(data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure want to delete your account? This cannot be undone.')) {
            return
        }

        try {
            const resp = await fetch(`${VM_IP}/${setLoggedInUser.id}`, {
                method: 'DELETE'
            })

            if (resp.ok) {
                localStorage.removeItem('user');
                window.location.href = '/';
            } else {
                alert('Failed to delete account.')
            }
        } catch (err) {
            alert('Error deleting account.')
        }
    };

    if (loading) {
        return <>Loading...</>;
    }

    if (!viewPerms) {
        return <Access />;
    }

    // TODO: Add some MUI Components down here to style it up.
    return (
        <div className='user-dash'>
            {/* TODO: This can be converted to a component/prop */}
            <div className='user-info-card'>
                <h2>Welcome, {userData.username}</h2>

                <div classname='user-details'>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.username}</p>
                </div>

                <div className='userActions'>
                    <button onClick={() => window.location.href = `/user/${userData.username}/edit`}>
                        Edit Profile
                    </button>
                    <button onClick={handleDelete} style={{ color: 'red' }} className='delete-btn'>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}

