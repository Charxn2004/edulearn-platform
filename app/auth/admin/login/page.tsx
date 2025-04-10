tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AdminLoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <Button className="w-full mt-4" type="submit">
              Login
            </Button>
             <div className="text-center text-sm mt-2">
              <Link href="/auth/teacher/login" className="text-blue-500 hover:underline">
                 Login as a teacher
                </Link>
                </div>
                <div className="text-center text-sm mt-2">
              <Link href="/auth/login" className="text-blue-500 hover:underline">
                 Login as a student
                </Link>
                </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;