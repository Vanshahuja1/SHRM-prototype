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
  BarChart3,
  Activity
} from 'lucide-react';

// --- TYPES ---
type DepartmentMember = {
  id: number;
  name: string;
  position: string;
  salary: number;
  experience: string;
  joinDate: string;
};

type Department = {
  id: number;
  name: string;
  managers: number;
  coManagers: number;
  employees: number;
  interns: number;
  members: DepartmentMember[];
};

type Project = {
  name: string;
  description: string;
  amount: number;
  client: string;
  deadline: string;
  startDate: string;
  progress?: number;
};

type DepartmentCardProps = {
  department: Department;
  onDeleteMember: (deptId: number, memberId: number) => void;
};

type ProjectsSectionProps = {
  projects: Project[];
  title: string;
  type: 'current' | 'past';
};

type StatColor = 'blue' | 'green' | 'purple' | 'orange';

// Hero Component
const Hero = () => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-r from-red-700 via-red-400 to-red-700 text-white p-8 rounded-xl mb-8"
  >
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">One Aim UPSC</h1>
      <p className="text-xl opacity-90 leading-relaxed">
        Organization management system for One Aim UPSC, visualizing departments, teams, and reporting for HR, Sales, Faculty, IT Support, and Management, tailored for educational excellence.
      </p>
    </div>
  </motion.div>
);

// Department Card Component
const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, onDeleteMember }) => {
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
                  <p className="text-sm text-gray-600">{member.position} • ₹{member.salary}/month • {member.experience} exp</p>
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

const Analytics = () => {
  const stats: {
    title: string;
    value: string;
    change: string;
    icon: React.ComponentType<{ size: number }>;
    color: StatColor;
  }[] = [
    { title: 'Total Employees', value: '85', change: '+3%', icon: Users, color: 'blue' },
    { title: 'Active Admissions', value: '130', change: '+7%', icon: Briefcase, color: 'green' },
    { title: 'Monthly Revenue', value: '₹12L', change: '+15%', icon: TrendingUp, color: 'purple' },
    { title: 'Departments', value: '5', change: '0%', icon: Building, color: 'orange' }
  ];

  const colorClasses: Record<StatColor, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200'
  };

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

const HierarchyChart = () => {
  // Tailored to the requested org structure
  const hierarchy = {
    ceo: { name: 'Director - One Aim UPSC', position: 'Director/CEO' },
    departments: [
      {
        name: 'HR',
        head: { name: 'Priya Sharma', position: 'Head of HR' },
        subunits: [
          { name: 'Finance', head: 'Rahul Sinha' },
          { name: 'Attendance', head: 'Neha Gupta' },
          { name: 'Performance', head: 'Rohit Mehra' }
        ]
      },
      {
        name: 'Sales',
        head: { name: 'Ankit Jain', position: 'Head of Sales' },
        subunits: [
          { name: 'Admissions', head: 'Kavita Singh' }
        ]
      },
      {
        name: 'Faculty',
        head: { name: 'Dr. Anil Kumar', position: 'Faculty Head' },
        subunits: []
      },
      {
        name: 'IT Support',
        head: { name: 'Sunil Verma', position: 'IT Support Lead' },
        subunits: [
          { name: 'Tele Callers', head: 'Geeta Yadav' },
          { name: 'Faculty IT Support', head: 'Suresh Nair' }
        ]
      },
      {
        name: 'Management',
        head: { name: 'Shalini Bhatt', position: 'Operations Manager' },
        subunits: [
          { name: 'MIS', head: 'Atul Mishra' },
          { name: 'Reporting', head: 'Pooja Arora' },
          { name: 'AlignUp', head: 'Sandeep Singh' },
          { name: 'Team Lead', head: 'Richa Thakur' },
          { name: 'MIS Coordinator', head: 'Vikram Joshi' }
        ]
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
        {/* CEO/Director */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg mb-8 shadow-lg"
        >
          <p className="font-bold">{hierarchy.ceo.name}</p>
          <p className="text-sm opacity-90">{hierarchy.ceo.position}</p>
        </motion.div>
        {/* Departments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {hierarchy.departments.map((dept, index) => (
            <motion.div 
              key={dept.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center w-full"
            >
              <div className="bg-blue-100 border-2 border-blue-300 p-3 rounded-lg mb-2 w-full text-center">
                <p className="font-semibold text-blue-800">{dept.head.name}</p>
                <p className="text-sm text-blue-600">{dept.head.position || dept.name}</p>
              </div>
              {dept.subunits.length > 0 && (
                <div className="w-full">
                  <div className="grid gap-2">
                    {dept.subunits.map((sub) => (
                      <div key={sub.name} className="bg-green-50 border border-green-200 p-2 rounded text-center">
                        <p className="text-sm font-medium text-green-800">{sub.name}</p>
                        <p className="text-xs text-green-600">Lead: {sub.head}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
const AdminDashboard = () => {
  // Departments tailored for One Aim UPSC
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: 'HR',
      managers: 1,
      coManagers: 2,
      employees: 8,
      interns: 1,
      members: [
        { id: 1, name: 'Priya Sharma', position: 'HR Head', salary: 50000, experience: '8 years', joinDate: '2021-04-10' },
        { id: 2, name: 'Rahul Sinha', position: 'Finance Lead', salary: 45000, experience: '6 years', joinDate: '2022-01-15' },
        { id: 3, name: 'Neha Gupta', position: 'Attendance Manager', salary: 40000, experience: '5 years', joinDate: '2021-06-21' },
        { id: 4, name: 'Rohit Mehra', position: 'Performance Analyst', salary: 42000, experience: '4 years', joinDate: '2023-03-12' }
      ]
    },
    {
      id: 2,
      name: 'Sales',
      managers: 1,
      coManagers: 1,
      employees: 7,
      interns: 1,
      members: [
        { id: 5, name: 'Ankit Jain', position: 'Head of Sales', salary: 48000, experience: '7 years', joinDate: '2021-07-25' },
        { id: 6, name: 'Kavita Singh', position: 'Admissions Lead', salary: 43000, experience: '5 years', joinDate: '2022-02-10' }
      ]
    },
    {
      id: 3,
      name: 'Faculty',
      managers: 1,
      coManagers: 0,
      employees: 30,
      interns: 0,
      members: [
        { id: 7, name: 'Dr. Anil Kumar', position: 'Faculty Head', salary: 80000, experience: '12 years', joinDate: '2020-03-10' },
        { id: 8, name: 'Manish Grover', position: 'Faculty', salary: 60000, experience: '8 years', joinDate: '2021-09-11' }
      ]
    },
    {
      id: 4,
      name: 'IT Support',
      managers: 1,
      coManagers: 1,
      employees: 6,
      interns: 2,
      members: [
        { id: 9, name: 'Sunil Verma', position: 'IT Support Lead', salary: 45000, experience: '6 years', joinDate: '2022-06-10' },
        { id: 10, name: 'Geeta Yadav', position: 'Tele Caller', salary: 22000, experience: '2 years', joinDate: '2023-01-15' },
        { id: 11, name: 'Suresh Nair', position: 'Faculty IT Support', salary: 32000, experience: '3 years', joinDate: '2023-02-05' }
      ]
    },
    {
      id: 5,
      name: 'Management',
      managers: 1,
      coManagers: 2,
      employees: 10,
      interns: 1,
      members: [
        { id: 12, name: 'Shalini Bhatt', position: 'Operations Manager', salary: 60000, experience: '9 years', joinDate: '2022-03-17' },
        { id: 13, name: 'Atul Mishra', position: 'MIS', salary: 35000, experience: '3 years', joinDate: '2023-01-22' },
        { id: 14, name: 'Pooja Arora', position: 'Reporting', salary: 37000, experience: '4 years', joinDate: '2023-04-01' },
        { id: 15, name: 'Sandeep Singh', position: 'AlignUp', salary: 34000, experience: '3 years', joinDate: '2023-07-09' },
        { id: 16, name: 'Richa Thakur', position: 'Team Lead', salary: 43000, experience: '6 years', joinDate: '2022-08-15' },
        { id: 17, name: 'Vikram Joshi', position: 'MIS Coordinator', salary: 36000, experience: '3 years', joinDate: '2023-02-12' }
      ]
    }
  ]);

  const handleDeleteMember = (deptId: number, memberId: number) => {
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

  // Projects can be omitted or tailored for educational org (example below)
  const currentProjects: Project[] = [
    {
      name: '2025 UPSC Batch Admissions',
      description: 'Managing admissions and onboarding for the incoming UPSC batch.',
      amount: 0,
      client: 'N/A',
      deadline: '2025-08-01',
      startDate: '2025-05-15',
      progress: 80
    },
    {
      name: 'Faculty Training Program',
      description: 'Continuous professional development for faculty and staff.',
      amount: 0,
      client: 'N/A',
      deadline: '2025-07-15',
      startDate: '2025-04-20',
      progress: 60
    }
  ];

  const pastProjects: Project[] = [
    {
      name: '2024 Batch Graduation',
      description: 'Completion ceremony and documentation for 2024 batch.',
      amount: 0,
      client: 'N/A',
      deadline: '2024-12-20',
      startDate: '2024-10-01'
    }
  ];

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

        <ProjectsSection projects={currentProjects} title="Current Initiatives" type="current" />
        <ProjectsSection projects={pastProjects} title="Past Initiatives" type="past" />
        <HierarchyChart />
      </div>
    </div>
  );
};

// Projects Section
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, title, type }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
                <span className="font-semibold text-green-600">{project.amount !== 0 ? `₹${project.amount.toLocaleString()}` : 'N/A'}</span>
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
            
            {type === 'current' && typeof project.progress === 'number' && (
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

export default AdminDashboard;