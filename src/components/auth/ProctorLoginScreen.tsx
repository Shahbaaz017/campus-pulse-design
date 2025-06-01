import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, Shield, Lock } from 'lucide-react';

const ProctorLoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [facultyId, setFacultyId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!facultyId || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    // Dummy login check for proctor
    if (facultyId === 'proctor' && password === 'proctorpass') {
      try {
        const success = await login(facultyId, password, 'admin');
        if (success) {
          navigate('/proctor/dashboard');
        } else {
          setError('Login failed. Please try again.');
        }
      } catch (err) {
        setError('Login failed. Please try again.');
      }
    } else {
      setError('Invalid Faculty ID or Password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-unicampus-red via-unicampus-red-light to-unicampus-red-dark flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 pt-12">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/10"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="flex-1 text-center text-white text-xl font-semibold mr-10">
          Proctor Login
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <span className="text-unicampus-red text-3xl font-bold">UC</span>
            </div>
            <h2 className="text-white text-2xl font-bold">UniCampus</h2>
            <p className="text-white/80 text-sm mt-2">Proctor Portal</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              {/* Faculty ID / Email Input */}
              <div className="space-y-2">
                <Label htmlFor="facultyId" className="text-gray-700 font-medium">
                  Faculty ID / Email
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="facultyId"
                    type="text"
                    placeholder="Enter your Faculty ID or Email"
                    value={facultyId}
                    onChange={(e) => setFacultyId(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-unicampus-red focus:ring-unicampus-red"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-unicampus-red focus:ring-unicampus-red"
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-unicampus-red hover:bg-unicampus-red-dark text-white py-3 h-12 text-lg font-semibold mt-6"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              {/* Forgot Password Link */}
              <div className="text-center mt-4">
                <button 
                  className="text-unicampus-red hover:text-unicampus-red-dark text-sm font-medium"
                  onClick={() => alert('Forgot Password feature coming soon!')}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-lg">
            <p className="text-white/90 text-sm text-center">
              <strong>Demo Credentials:</strong><br />
              Faculty ID: proctor<br />
              Password: proctorpass
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProctorLoginScreen;
