"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Calendar, 
  Trash2, 
  Eye,
  DollarSign,
  Clock,
  Building,
  UserCheck,
  UserX,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

// Hero Component
const Hero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-700 via-red-400 to-red-700 text-white p-8 rounded-xl mb-8"
    >
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">One Aim Solutions</h1>
        <p className="text-xl opacity-90 leading-relaxed">
          Advanced enterprise management system providing comprehensive oversight of departments, 
          projects, and organizational hierarchy. Streamline operations with real-time analytics and efficient workforce management.
        </p>
      </div>
    </motion.div>
  );
};

// Department Card Component
const DepartmentCard = ({ department, onViewDetails, onDeleteMember }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Building className="text-blue-600" size={20} />
          {department.name}
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Eye size={16} />
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-blue-600 font-semibold">Managers</p>
          <p className="text-2xl font-bold text-blue-800">{department.managers}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-green-600 font-semibold">Co-Managers</p>
          <p className="text-2xl font-bold text-green-800">{department.coManagers}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-purple-600 font-semibold">Employees</p>
          <p className="text-2xl font-bold text-purple-800">{department.employees}</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <p className="text-orange-600 font-semibold">Interns</p>
          <p className="text-2xl font-bold text-orange-800">{department.interns}</p>
        </div>
      </div>

      {showDetails && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t pt-4"
        >
          <h4 className="font-semibold mb-3">Department Members</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {department.members.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.position} • ${member.salary}/month • {member.experience} exp</p>
                  <p className="text-xs text-gray-500">Joined: {member.joinDate}</p>
                </div>
                <button
                  onClick={() => onDeleteMember(department.id, member.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Projects Component
const ProjectsSection = ({ projects, title, type }) => {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Briefcase className="text-purple-600" />
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            List
          </button>
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className={`border rounded-lg p-4 ${type === 'current' ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
          >
            <h3 className="font-bold text-lg mb-2">{project.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-green-600" />
                <span className="font-semibold text-green-600">${project.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-600" />
                <span className="text-sm">{project.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-purple-600" />
                <span className="text-sm">{project.deadline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-orange-600" />
                <span className="text-sm">Started: {project.startDate}</span>
              </div>
            </div>
            
            {type === 'current' && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{project.progress}% Complete</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Hierarchy Chart Component
const HierarchyChart = () => {
  const hierarchy = {
    ceo: { name: 'John Smith', position: 'CEO' },
    departments: [
      {
        head: { name: 'Sarah Johnson', position: 'IT Director' },
        managers: ['Mike Chen', 'Lisa Wang'],
        employees: 15
      },
      {
        head: { name: 'David Brown', position: 'HR Director' },
        managers: ['Emma Davis', 'Alex Wilson'],
        employees: 8
      },
      {
        head: { name: 'Maria Garcia', position: 'Business Dev Director' },
        managers: ['Tom Anderson', 'Kate Miller'],
        employees: 12
      }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Activity className="text-indigo-600" />
        Organization Hierarchy
      </h2>
      
      <div className="flex flex-col items-center">
        {/* CEO */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg mb-8 shadow-lg"
        >
          <p className="font-bold">{hierarchy.ceo.name}</p>
          <p className="text-sm opacity-90">{hierarchy.ceo.position}</p>
        </motion.div>
        
        {/* Department Heads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {hierarchy.departments.map((dept, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="bg-blue-100 border-2 border-blue-300 p-3 rounded-lg mb-4">
                <p className="font-semibold text-blue-800">{dept.head.name}</p>
                <p className="text-sm text-blue-600">{dept.head.position}</p>
              </div>
              
              <div className="space-y-2 w-full">
                {dept.managers.map((manager, idx) => (
                  <div key={idx} className="bg-green-50 border border-green-200 p-2 rounded text-center">
                    <p className="text-sm font-medium text-green-800">{manager}</p>
                    <p className="text-xs text-green-600">Manager</p>
                  </div>
                ))}
                <div className="bg-gray-50 border border-gray-200 p-2 rounded text-center">
                  <p className="text-sm font-medium text-gray-800">{dept.employees} Employees</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Analytics Dashboard
const Analytics = () => {
  const stats = [
    { title: 'Total Employees', value: '247', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Active Projects', value: '18', change: '+5%', icon: Briefcase, color: 'green' },
    { title: 'Monthly Revenue', value: '$2.4M', change: '+18%', icon: TrendingUp, color: 'purple' },
    { title: 'Departments', value: '5', change: '0%', icon: Building, color: 'orange' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BarChart3 className="text-green-600" />
        Analytics Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600 border-blue-200',
            green: 'bg-green-50 text-green-600 border-green-200',
            purple: 'bg-purple-50 text-purple-600 border-purple-200',
            orange: 'bg-orange-50 text-orange-600 border-orange-200'
          };
          
          return (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`p-6 rounded-lg border-2 ${colorClasses[stat.color]}`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={24} />
                <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm opacity-75">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
const AdminDashboard = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'IT Development',
      managers: 3,
      coManagers: 2,
      employees: 25,
      interns: 8,
      members: [
        { id: 1, name: 'John Doe', position: 'Senior Developer', salary: 8500, experience: '5 years', joinDate: '2023-01-15' },
        { id: 2, name: 'Jane Smith', position: 'Frontend Developer', salary: 6500, experience: '3 years', joinDate: '2023-03-20' },
        { id: 3, name: 'Mike Johnson', position: 'DevOps Engineer', salary: 7500, experience: '4 years', joinDate: '2023-02-10' }
      ]
    },
    {
      id: 2,
      name: 'Human Resources',
      managers: 2,
      coManagers: 1,
      employees: 12,
      interns: 3,
      members: [
        { id: 4, name: 'Sarah Wilson', position: 'HR Manager', salary: 7000, experience: '6 years', joinDate: '2022-11-05' },
        { id: 5, name: 'Tom Brown', position: 'Recruiter', salary: 5500, experience: '2 years', joinDate: '2023-05-12' }
      ]
    },
    {
      id: 3,
      name: 'Business Development',
      managers: 2,
      coManagers: 2,
      employees: 18,
      interns: 5,
      members: [
        { id: 6, name: 'Emma Davis', position: 'Business Analyst', salary: 6800, experience: '4 years', joinDate: '2023-01-20' },
        { id: 7, name: 'Alex Chen', position: 'Sales Manager', salary: 8000, experience: '7 years', joinDate: '2022-09-15' }
      ]
    },
    {
      id: 4,
      name: 'Management',
      managers: 4,
      coManagers: 2,
      employees: 15,
      interns: 2,
      members: [
        { id: 8, name: 'Robert Taylor', position: 'Project Manager', salary: 9000, experience: '8 years', joinDate: '2022-08-01' },
        { id: 9, name: 'Lisa Anderson', position: 'Operations Manager', salary: 8500, experience: '6 years', joinDate: '2022-10-10' }
      ]
    },
    {
      id: 5,
      name: 'IT/CS Support',
      managers: 2,
      coManagers: 1,
      employees: 10,
      interns: 4,
      members: [
        { id: 10, name: 'Kevin Miller', position: 'System Administrator', salary: 7200, experience: '5 years', joinDate: '2023-02-28' },
        { id: 11, name: 'Amy Garcia', position: 'IT Support Specialist', salary: 5800, experience: '3 years', joinDate: '2023-04-15' }
      ]
    }
  ]);

  const currentProjects = [
    {
      name: 'E-Commerce Platform',
      description: 'Complete redesign and development of the company e-commerce platform with advanced features',
      amount: 250000,
      client: 'RetailCorp Inc.',
      deadline: '2025-08-15',
      startDate: '2025-02-01',
      progress: 65
    },
    {
      name: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication and real-time transactions',
      amount: 180000,
      client: 'FirstBank Solutions',
      deadline: '2025-07-30',
      startDate: '2025-01-15',
      progress: 45
    },
    {
      name: 'HR Management System',
      description: 'Comprehensive HR system for employee management, payroll, and performance tracking',
      amount: 120000,
      client: 'TechStartup Ltd.',
      deadline: '2025-09-20',
      startDate: '2025-03-01',
      progress: 80
    }
  ];

  const pastProjects = [
    {
      name: 'CRM Integration',
      description: 'Custom CRM integration with existing business processes and third-party APIs',
      amount: 95000,
      client: 'BusinessFlow Corp.',
      deadline: '2024-12-15',
      startDate: '2024-08-01'
    },
    {
      name: 'Data Analytics Dashboard',
      description: 'Real-time analytics dashboard for business intelligence and reporting',
      amount: 75000,
      client: 'DataDriven Inc.',
      deadline: '2024-11-30',
      startDate: '2024-07-15'
    }
  ];

  const handleDeleteMember = (deptId, memberId) => {
    setDepartments(prevDepts => 
      prevDepts.map(dept => {
        if (dept.id === deptId) {
          const updatedMembers = dept.members.filter(member => member.id !== memberId);
          return {
            ...dept,
            members: updatedMembers,
            employees: dept.employees - 1
          };
        }
        return dept;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Hero />
        
        <Analytics />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Building className="text-blue-600" />
            Department Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <DepartmentCard
                key={dept.id}
                department={dept}
                onDeleteMember={handleDeleteMember}
              />
            ))}
          </div>
        </motion.div>

        <ProjectsSection projects={currentProjects} title="Current Projects" type="current" />
        
        <ProjectsSection projects={pastProjects} title="Past Projects" type="past" />
        
        <HierarchyChart />
      </div>
    </div>
  );
};

export default AdminDashboard;