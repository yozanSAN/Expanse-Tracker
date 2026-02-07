import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase-config.js';
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { Link } from 'react-router-dom';
import userDefaultPhoto from '../../assets/default-avatar.png';
import {
    User, Mail,
    Settings, Camera, LogOut, ChevronRight, Loader2
} from 'lucide-react';

const ProfilePage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('account');

    // State for form fields
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    // 1. Listen for Auth State Changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setDisplayName(user.displayName || "");
                setPhotoURL(user.photoURL || userDefaultPhoto);
            } else {
                setCurrentUser(null);
                // Redirect to login logic could go here
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // 2. Handle Profile Update
    const handleSave = async () => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: displayName,
                // photoURL: photoURL // You can update this once you have a storage URL
            });
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    // 3. Handle Sign Out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={48} />
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-textPrimary">
                <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
                <Link to='/'>
                    <button className="bg-accent text-primary px-6 py-2 rounded-xl font-bold">Go to Login</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary text-textPrimary font-sans">
            <div className="max-w-6xl mx-auto px-4 py-10">

                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-secondary/50 p-8 rounded-3xl border border-tertiary/30">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-2xl bg-tertiary flex items-center justify-center border-2 border-accent overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                            {currentUser.photoURL ? (
                                <img src={currentUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <User size={64} className="text-textSecondary" />
                            )}
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2 bg-accent text-primary rounded-xl hover:scale-110 transition-transform">
                            <Camera size={20} />
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-bold tracking-tight">{currentUser.displayName || "User"}</h1>
                        <p className="text-textSecondary mt-1">{currentUser.email}</p>
                        <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              <span className="px-3 py-1 bg-tertiary/50 text-accent text-xs font-bold rounded-full border border-accent/20 tracking-widest">
                {currentUser.emailVerified ? "VERIFIED" : "PENDING"}
              </span>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 bg-danger/10 text-danger hover:bg-danger hover:text-white px-5 py-2.5 rounded-xl transition-all font-medium border border-danger/20"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar Nav */}
                    <nav className="lg:col-span-3 space-y-2">
                        {['account', 'security', 'billing'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all capitalize ${
                                    activeTab === tab
                                        ? 'bg-tertiary text-accent border-r-4 border-accent'
                                        : 'hover:bg-secondary text-textSecondary'
                                }`}
                            >
                                <span className="font-medium">{tab}</span>
                                <ChevronRight size={16} className={activeTab === tab ? 'opacity-100' : 'opacity-0'} />
                            </button>
                        ))}
                    </nav>

                    {/* Content Area */}
                    <main className="lg:col-span-9">
                        <div className="bg-secondary rounded-3xl p-8 border border-tertiary/50">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase tracking-wide">
                                <Settings size={22} className="text-accent" />
                                Account Settings
                            </h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-textMuted font-medium ml-1">Display Name</label>
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="w-full bg-primary border border-tertiary rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-textPrimary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-textMuted font-medium ml-1">Email (Read Only)</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-3.5 text-textMuted" size={18} />
                                            <input
                                                type="text"
                                                disabled
                                                value={currentUser.email}
                                                className="w-full bg-primary/50 border border-tertiary rounded-xl pl-12 pr-4 py-3 text-textMuted cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex justify-end gap-4">
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-2.5 bg-accent hover:bg-accent-soft text-primary font-bold rounded-xl transition-all shadow-lg shadow-accent/20 active:scale-95"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;