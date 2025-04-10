tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const StudentLoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Student Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" required />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentLoginPage;