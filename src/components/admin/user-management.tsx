'use client';

import { motion } from 'framer-motion';
import { Plus, Trash2, Power, PowerOff, Key, Copy, Check } from 'lucide-react';
import { useState, useTransition } from 'react';
import type { User } from '@/types/analytics';
import { addUser, removeUser, toggleUserStatus, resetUserPassword } from '@/app/adminl33t/actions';
import { Button } from '@/components/ui/button';

interface UserManagementProps {
  users: User[];
}

export function UserManagement({ users: initialUsers }: UserManagementProps) {
  const [users, setUsers] = useState(initialUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [generatedUsername, setGeneratedUsername] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAddUser = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addUser(formData);
      if (result.success && result.password && result.username) {
        setGeneratedPassword(result.password);
        setGeneratedUsername(result.username);
        setShowAddModal(false);
        setShowPasswordModal(true);
        // Refresh users list
        window.location.reload();
      }
    });
  };

  const handleRemoveUser = async (username: string) => {
    if (!confirm(`Are you sure you want to delete user "${username}"?`)) return;
    
    startTransition(async () => {
      await removeUser(username);
      setUsers(users.filter(u => u.username !== username));
    });
  };

  const handleToggleStatus = async (username: string) => {
    startTransition(async () => {
      const result = await toggleUserStatus(username);
      if (result.success) {
        setUsers(users.map(u => 
          u.username === username ? { ...u, isActive: result.isActive! } : u
        ));
      }
    });
  };

  const handleResetPassword = async (username: string) => {
    if (!confirm(`Reset password for user "${username}"?`)) return;
    
    startTransition(async () => {
      const result = await resetUserPassword(username);
      if (result.success && result.password) {
        setGeneratedPassword(result.password);
        setGeneratedUsername(username);
        setShowPasswordModal(true);
      }
    });
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">User Management</h2>
        <Button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-card/30">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Username</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Created</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Last Login</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.username} className="hover:bg-card/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.isActive 
                      ? 'bg-green-400/10 text-green-400' 
                      : 'bg-red-400/10 text-red-400'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleToggleStatus(user.username)}
                      disabled={isPending}
                      className="p-2 hover:bg-background rounded transition-colors disabled:opacity-50"
                      title={user.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {user.isActive ? (
                        <PowerOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Power className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                    <button
                      onClick={() => handleResetPassword(user.username)}
                      disabled={isPending}
                      className="p-2 hover:bg-background rounded transition-colors disabled:opacity-50"
                      title="Reset Password"
                    >
                      <Key className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleRemoveUser(user.username)}
                      disabled={isPending}
                      className="p-2 hover:bg-background rounded transition-colors disabled:opacity-50"
                      title="Delete User"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Add New User</h3>
            <form action={handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  pattern="[a-z0-9-]+"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="investor1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Lowercase letters, numbers, and hyphens only
                </p>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password (optional)
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="Leave empty to auto-generate"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to generate a secure random password
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-background hover:bg-background/80"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isPending ? 'Adding...' : 'Add User'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Password Display Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">User Credentials</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Username
                </label>
                <div className="px-4 py-2 bg-background border border-border rounded-lg text-foreground font-mono">
                  {generatedUsername}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground font-mono break-all">
                    {generatedPassword}
                  </div>
                  <button
                    onClick={copyPassword}
                    className="p-2 hover:bg-background rounded transition-colors"
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-green-400" />
                    ) : (
                      <Copy className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Important:</strong> Save this password now. It won't be shown again.
                </p>
              </div>
              <Button
                onClick={() => setShowPasswordModal(false)}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Done
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
