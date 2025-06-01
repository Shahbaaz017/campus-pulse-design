
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  MessageSquare, 
  Bell, 
  ClipboardList, 
  BarChart3, 
  BookOpen,
  Settings,
  Plus,
  AlertTriangle
} from 'lucide-react';

const ProctorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const overviewStats = [
    { label: 'Assigned Students', value: '45', icon: Users, color: 'text-blue-600' },
    { label: 'Unread Messages', value: '12', icon: MessageSquare, color: 'text-green-600' },
    { label: 'Pending Reviews', value: '8', icon: ClipboardList, color: 'text-orange-600' },
    { label: 'Low Attendance Alerts', value: '3', icon: AlertTriangle, color: 'text-red-600' },
  ];

  const quickActions = [
    { 
      title: 'Manage Students', 
      description: 'View and manage assigned students',
      icon: Users,
      path: '/proctor/students',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    { 
      title: 'Create Announcement', 
      description: 'Send announcements to students',
      icon: Plus,
      path: '/proctor/announcements/create',
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    { 
      title: 'Attendance Overview', 
      description: 'Monitor student attendance',
      icon: BarChart3,
      path: '/proctor/attendance',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    },
    { 
      title: 'Manage Resources', 
      description: 'Upload and manage course resources',
      icon: BookOpen,
      path: '/proctor/resources',
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    },
  ];

  const recentActivity = [
    { type: 'message', content: 'New query from Rajesh Kumar', time: '2 hours ago' },
    { type: 'attendance', content: 'Attendance updated for CS-6C', time: '4 hours ago' },
    { type: 'announcement', content: 'Posted assignment deadline reminder', time: '1 day ago' },
    { type: 'resource', content: 'Uploaded new study material', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Proctor Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {user?.name || 'Proctor'}
              </p>
            </div>
            <Button
              onClick={() => navigate('/settings')}
              variant="outline"
              size="icon"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and features for proctors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-auto p-4 justify-start ${action.color}`}
                      onClick={() => navigate(action.path)}
                    >
                      <div className="flex items-start space-x-3">
                        <action.icon className="h-6 w-6 mt-1" />
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {action.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates and actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-unicampus-red rounded-full mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {activity.content}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProctorDashboard;
