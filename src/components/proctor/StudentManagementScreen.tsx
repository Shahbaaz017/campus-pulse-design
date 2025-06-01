
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ChevronLeft, 
  User, 
  MessageCircle, 
  ClipboardList,
  BarChart3,
  Filter
} from 'lucide-react';

const StudentManagementScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock student data - would come from API in real app
  const students = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      usn: 'MS22CSE001',
      class: 'SEM 06-C',
      course: 'B.E-CS',
      attendance: 85,
      lastActive: '2 hours ago',
      status: 'active',
      unreadMessages: 2
    },
    {
      id: '2',
      name: 'Priya Sharma',
      usn: 'MS22CSE002',
      class: 'SEM 06-C',
      course: 'B.E-CS',
      attendance: 92,
      lastActive: '1 day ago',
      status: 'active',
      unreadMessages: 0
    },
    {
      id: '3',
      name: 'Arjun Patel',
      usn: 'MS22CSE003',
      class: 'SEM 06-C',
      course: 'B.E-CS',
      attendance: 67,
      lastActive: '3 days ago',
      status: 'low_attendance',
      unreadMessages: 1
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      usn: 'MS22CSE004',
      class: 'SEM 06-C',
      course: 'B.E-CS',
      attendance: 88,
      lastActive: '5 hours ago',
      status: 'active',
      unreadMessages: 0
    },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.usn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 85) return 'text-green-600 bg-green-50';
    if (attendance >= 75) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-green-50 text-green-700">Active</Badge>;
      case 'low_attendance':
        return <Badge variant="destructive">Low Attendance</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="mr-4"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Student Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and monitor your assigned students
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or USN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Student Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-unicampus-red rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {student.usn}
                      </p>
                    </div>
                  </div>
                  {student.unreadMessages > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {student.unreadMessages}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Class:</span>
                    <span className="text-sm font-medium">{student.class}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Attendance:</span>
                    <Badge className={getAttendanceColor(student.attendance)}>
                      {student.attendance}%
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                    {getStatusBadge(student.status)}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Active:</span>
                    <span className="text-sm">{student.lastActive}</span>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate(`/proctor/students/${student.id}`)}
                    >
                      <ClipboardList className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert('Message feature coming soon!')}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No students found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagementScreen;
