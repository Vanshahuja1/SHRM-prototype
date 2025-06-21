"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  TrendingUp,
  Calendar,
  Trash2,
  Building,
  BarChart3,
  Activity,
  Menu,
  X,
  Home,
  ChevronRight,
  Mail,
  Phone,
  Award,
  ArrowLeft,
  Search,
  Settings,
  Bell,
  LogOut,
  GraduationCap,
  BookOpen,
  Clock,
  Sun,
  Moon,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Types
type DepartmentMember = {
  id: number
  name: string
  position: string
  salary: number
  experience: string
  joinDate: string
  email?: string
  phone?: string
  address?: string
  manager?: string
  skills?: string[]
  performance?: number
}

type Department = {
  id: number
  name: string
  managers: number
  coManagers: number
  employees: number
  interns: number
  members: DepartmentMember[]
  budget?: number
  head: string
}

type Faculty = {
  id: number
  name: string
  subject: string
  experience: string
  qualification: string
  rating: number
  students: number
  salary: number
  joinDate: string
  email?: string
  phone?: string
  batches: string[]
}

type Student = {
  id: number
  name: string
  batch: string
  enrollmentDate: string
  phone: string
  email: string
  feeStatus: "paid" | "pending" | "overdue"
  attendance: number
  performance: number
}

type Batch = {
  id: number
  name: string
  type: "morning" | "evening"
  startTime: string
  endTime: string
  faculty: string
  students: number
  capacity: number
  subjects: string[]
  startDate: string
  duration: string
  fees: number
}

// Sample data
const sampleDepartments: Department[] = [
  {
    id: 1,
    name: "HR Department",
    managers: 1,
    coManagers: 2,
    employees: 8,
    interns: 1,
    budget: 600000,
    head: "Priya Sharma",
    members: [
      {
        id: 1,
        name: "Priya Sharma",
        position: "HR Head",
        salary: 50000,
        experience: "8 years",
        joinDate: "2021-04-10",
        email: "priya.sharma@oneaimupsc.com",
        phone: "+91-9876543210",
        address: "Delhi, India",
        manager: "Director",
        skills: ["HR Management", "Recruitment", "Employee Relations"],
        performance: 95,
      },
      {
        id: 2,
        name: "Rahul Sinha",
        position: "Finance Lead",
        salary: 45000,
        experience: "6 years",
        joinDate: "2022-01-15",
        email: "rahul.sinha@oneaimupsc.com",
        phone: "+91-9876543211",
        address: "Delhi, India",
        manager: "Priya Sharma",
        skills: ["Financial Management", "Budgeting", "Accounting"],
        performance: 88,
      },
    ],
  },
  {
    id: 2,
    name: "Sales Department",
    managers: 1,
    coManagers: 1,
    employees: 7,
    interns: 1,
    budget: 450000,
    head: "Ankit Jain",
    members: [
      {
        id: 5,
        name: "Ankit Jain",
        position: "Head of Sales",
        salary: 48000,
        experience: "7 years",
        joinDate: "2021-07-25",
        email: "ankit.jain@oneaimupsc.com",
        phone: "+91-9876543214",
        address: "Delhi, India",
        manager: "Director",
        skills: ["Sales Management", "Team Leadership", "Customer Relations"],
        performance: 92,
      },
      {
        id: 6,
        name: "Kavita Singh",
        position: "Admissions Lead",
        salary: 43000,
        experience: "5 years",
        joinDate: "2022-02-10",
        email: "kavita.singh@oneaimupsc.com",
        phone: "+91-9876543215",
        address: "Delhi, India",
        manager: "Ankit Jain",
        skills: ["Admissions", "Student Counseling", "Communication"],
        performance: 89,
      },
    ],
  },
  {
    id: 3,
    name: "Faculty Department",
    managers: 1,
    coManagers: 0,
    employees: 30,
    interns: 0,
    budget: 2400000,
    head: "Dr. Anil Kumar",
    members: [
      {
        id: 7,
        name: "Dr. Anil Kumar",
        position: "Faculty Head",
        salary: 80000,
        experience: "12 years",
        joinDate: "2020-03-10",
        email: "anil.kumar@oneaimupsc.com",
        phone: "+91-9876543216",
        address: "Delhi, India",
        manager: "Director",
        skills: ["UPSC Coaching", "Public Administration", "Leadership"],
        performance: 96,
      },
    ],
  },
  {
    id: 4,
    name: "IT Support",
    managers: 1,
    coManagers: 1,
    employees: 6,
    interns: 2,
    budget: 350000,
    head: "Sunil Verma",
    members: [
      {
        id: 9,
        name: "Sunil Verma",
        position: "IT Support Lead",
        salary: 45000,
        experience: "6 years",
        joinDate: "2022-06-10",
        email: "sunil.verma@oneaimupsc.com",
        phone: "+91-9876543218",
        address: "Delhi, India",
        manager: "Director",
        skills: ["IT Support", "Network Management", "Technical Training"],
        performance: 88,
      },
    ],
  },
  {
    id: 5,
    name: "Management",
    managers: 1,
    coManagers: 2,
    employees: 10,
    interns: 1,
    budget: 700000,
    head: "Shalini Bhatt",
    members: [
      {
        id: 12,
        name: "Shalini Bhatt",
        position: "Operations Manager",
        salary: 60000,
        experience: "9 years",
        joinDate: "2022-03-17",
        email: "shalini.bhatt@oneaimupsc.com",
        phone: "+91-9876543221",
        address: "Delhi, India",
        manager: "Director",
        skills: ["Operations Management", "Strategic Planning", "Team Leadership"],
        performance: 93,
      },
    ],
  },
]

const sampleFaculties: Faculty[] = [
  {
    id: 1,
    name: "Dr. Anil Kumar",
    subject: "Public Administration",
    experience: "12 years",
    qualification: "PhD in Public Administration",
    rating: 4.8,
    students: 120,
    salary: 80000,
    joinDate: "2020-03-10",
    email: "anil.kumar@oneaimupsc.com",
    phone: "+91-9876543216",
    batches: ["Morning Batch A", "Evening Batch A"],
  },
  {
    id: 2,
    name: "Prof. Manish Grover",
    subject: "History & Geography",
    experience: "8 years",
    qualification: "MA History, MA Geography",
    rating: 4.6,
    students: 95,
    salary: 60000,
    joinDate: "2021-09-11",
    email: "manish.grover@oneaimupsc.com",
    phone: "+91-9876543217",
    batches: ["Morning Batch B", "Evening Batch B"],
  },
  {
    id: 3,
    name: "Dr. Priya Mehta",
    subject: "Economics",
    experience: "10 years",
    qualification: "PhD in Economics",
    rating: 4.7,
    students: 85,
    salary: 70000,
    joinDate: "2020-08-15",
    email: "priya.mehta@oneaimupsc.com",
    phone: "+91-9876543230",
    batches: ["Morning Batch A", "Evening Batch A"],
  },
  {
    id: 4,
    name: "Mr. Rajesh Singh",
    subject: "Current Affairs & GS",
    experience: "6 years",
    qualification: "MA Political Science",
    rating: 4.5,
    students: 110,
    salary: 55000,
    joinDate: "2022-01-20",
    email: "rajesh.singh@oneaimupsc.com",
    phone: "+91-9876543231",
    batches: ["Morning Batch B", "Evening Batch B"],
  },
  {
    id: 5,
    name: "Ms. Neha Gupta",
    subject: "English & Essay Writing",
    experience: "5 years",
    qualification: "MA English Literature",
    rating: 4.4,
    students: 75,
    salary: 45000,
    joinDate: "2022-06-10",
    email: "neha.gupta@oneaimupsc.com",
    phone: "+91-9876543232",
    batches: ["Morning Batch A", "Evening Batch A"],
  },
]

const sampleBatches: Batch[] = [
  {
    id: 1,
    name: "Morning Batch A",
    type: "morning",
    startTime: "6:00 AM",
    endTime: "12:00 PM",
    faculty: "Dr. Anil Kumar",
    students: 45,
    capacity: 50,
    subjects: ["Public Administration", "Economics", "English"],
    startDate: "2024-01-15",
    duration: "12 months",
    fees: 85000,
  },
  {
    id: 2,
    name: "Morning Batch B",
    type: "morning",
    startTime: "7:00 AM",
    endTime: "1:00 PM",
    faculty: "Prof. Manish Grover",
    students: 42,
    capacity: 50,
    subjects: ["History", "Geography", "Current Affairs"],
    startDate: "2024-02-01",
    duration: "12 months",
    fees: 85000,
  },
  {
    id: 3,
    name: "Evening Batch A",
    type: "evening",
    startTime: "2:00 PM",
    endTime: "8:00 PM",
    faculty: "Dr. Anil Kumar",
    students: 48,
    capacity: 50,
    subjects: ["Public Administration", "Economics", "English"],
    startDate: "2024-01-20",
    duration: "12 months",
    fees: 85000,
  },
  {
    id: 4,
    name: "Evening Batch B",
    type: "evening",
    startTime: "3:00 PM",
    endTime: "9:00 PM",
    faculty: "Prof. Manish Grover",
    students: 46,
    capacity: 50,
    subjects: ["History", "Geography", "Current Affairs"],
    startDate: "2024-02-10",
    duration: "12 months",
    fees: 85000,
  },
]

const monthlyData = [
  { month: "Jan", revenue: 1200000, students: 450, admissions: 45 },
  { month: "Feb", revenue: 1350000, students: 465, admissions: 52 },
  { month: "Mar", revenue: 1280000, students: 470, admissions: 48 },
  { month: "Apr", revenue: 1450000, students: 485, admissions: 58 },
  { month: "May", revenue: 1380000, students: 490, admissions: 55 },
  { month: "Jun", revenue: 1520000, students: 495, admissions: 62 },
]

// Sidebar Navigation
const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  const menuItems = [
    { id: "overview", label: "Dashboard", icon: Home },
    { id: "sub-departments", label: "Sub Departments", icon: Building },
    { id: "ongoing-batches", label: "Ongoing Batches", icon: BookOpen },
    { id: "faculties-list", label: "Faculties List", icon: GraduationCap },
    { id: "organization-hierarchy", label: "Organization Hierarchy", icon: Activity },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-72 bg-white border-r border-gray-200 shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">One Aim UPSC</h1>
                  <p className="text-sm text-gray-500">Admin Dashboard</p>
                </div>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setIsSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    activeTab === item.id
                      ? "bg-red-50 text-red-700 border-l-4 border-red-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Admin User</p>
                <p className="text-sm text-gray-500">System Administrator</p>
              </div>
              <button className="text-gray-400 hover:text-red-600">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Top Header Bar
const TopHeader = ({ activeTab, setIsSidebarOpen }) => {
  const getPageTitle = (tab) => {
    switch (tab) {
      case "overview":
        return "Dashboard Overview"
      case "sub-departments":
        return "Sub Departments"
      case "ongoing-batches":
        return "Ongoing Batches"
      case "faculties-list":
        return "Faculties List"
      case "organization-hierarchy":
        return "Organization Hierarchy"
      default:
        return "Dashboard"
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getPageTitle(activeTab)}</h1>
            <p className="text-sm text-gray-500">Manage your UPSC coaching organization efficiently</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
          </button>
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

// Hero Component
const Hero = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className=""
  >
    
  </motion.div>
)

// Overview Component
const Overview = () => {
  return (
    <div className="space-y-6">
      <Hero />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Students", value: "495", change: "+7%", icon: GraduationCap, color: "red" },
          { title: "Active Batches", value: "4", change: "+1", icon: BookOpen, color: "green" },
          { title: "Faculty Members", value: "15", change: "0%", icon: Users, color: "blue" },
          { title: "Departments", value: "5", change: "0%", icon: Building, color: "purple" },
        ].map((stat, index) => {
          const Icon = stat.icon
          const colorClasses = {
            red: "bg-red-50 text-red-700 border-red-200",
            green: "bg-green-50 text-green-700 border-green-200",
            blue: "bg-blue-50 text-blue-700 border-blue-200",
            purple: "bg-purple-50 text-purple-700 border-purple-200",
          }

          return (
            <motion.div
              key={index}
              whileHover={{ y: -2, scale: 1.01 }}
              className={`p-6 rounded-xl border-2 ${colorClasses[stat.color]} bg-white shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${colorClasses[stat.color].replace("border-", "bg-").replace("-200", "-100")}`}
                >
                  <Icon size={24} />
                </div>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.change.startsWith("+") ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1 text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-600" size={20} />
            </div>
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#DC2626"
                strokeWidth={3}
                dot={{ fill: "#DC2626", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Student Admissions Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="text-blue-600" size={20} />
            </div>
            Student Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="students" fill="#DC2626" name="Total Students" radius={[4, 4, 0, 0]} />
              <Bar dataKey="admissions" fill="#7C3AED" name="New Admissions" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// Sub Departments Component
const SubDepartments = ({ departments, onDeleteMember }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  if (selectedDepartment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setSelectedDepartment(null)}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Departments
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedDepartment.name}</h1>
          <p className="text-gray-600 mb-6">
            Department Head: <span className="font-semibold text-red-600">{selectedDepartment.head}</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedDepartment.members.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ y: -2, scale: 1.01 }}
                className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                    <p className="text-gray-600">{member.position}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Salary:</span>
                    <span className="font-semibold text-green-600">₹{member.salary.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-semibold text-gray-900">{member.experience}</span>
                  </p>
                  {member.performance && (
                    <p className="flex justify-between">
                      <span className="text-gray-600">Performance:</span>
                      <span className="font-semibold text-red-600">{member.performance}%</span>
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Joined: {member.joinDate}</span>
                  <button
                    onClick={() => onDeleteMember(selectedDepartment.id, member.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Sub Departments</h1>
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold">
          {departments.length} Active Departments
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <motion.div
            key={dept.id}
            whileHover={{ y: -2, scale: 1.01 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all"
            onClick={() => setSelectedDepartment(dept)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
              <ChevronRight className="text-red-600" size={20} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-red-50 p-3 rounded-lg text-center border border-red-200">
                <p className="text-red-600 font-semibold text-sm">Managers</p>
                <p className="text-xl font-bold text-red-800">{dept.managers}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200">
                <p className="text-green-600 font-semibold text-sm">Employees</p>
                <p className="text-xl font-bold text-green-800">{dept.employees}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-2">Department Head</p>
              <p className="font-semibold text-gray-900">{dept.head}</p>
              {dept.budget && (
                <p className="text-sm text-green-600 font-semibold mt-2">Budget: ₹{dept.budget.toLocaleString()}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Ongoing Batches Component
const OngoingBatches = ({ batches }) => {
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [viewType, setViewType] = useState("all") // "all", "morning", "evening"

  const filteredBatches = batches.filter((batch) => {
    if (viewType === "all") return true
    return batch.type === viewType
  })

  if (selectedBatch) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setSelectedBatch(null)}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Batches
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedBatch.name}</h1>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedBatch.type === "morning" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedBatch.type === "morning" ? "Morning Batch" : "Evening Batch"}
                </span>
                <span className="text-gray-600">
                  {selectedBatch.startTime} - {selectedBatch.endTime}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">₹{selectedBatch.fees.toLocaleString()}</p>
              <p className="text-gray-600">Course Fees</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="text-blue-600" size={20} />
                <span className="text-blue-800 font-semibold">Students</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {selectedBatch.students}/{selectedBatch.capacity}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="text-green-600" size={20} />
                <span className="text-green-800 font-semibold">Faculty</span>
              </div>
              <p className="text-lg font-semibold text-green-600">{selectedBatch.faculty}</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-purple-600" size={20} />
                <span className="text-purple-800 font-semibold">Duration</span>
              </div>
              <p className="text-lg font-semibold text-purple-600">{selectedBatch.duration}</p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-red-600" size={20} />
                <span className="text-red-800 font-semibold">Started</span>
              </div>
              <p className="text-lg font-semibold text-red-600">{selectedBatch.startDate}</p>
            </div>
          </div>

          {/* Subjects */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Subjects Covered</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedBatch.subjects.map((subject, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <BookOpen size={20} className="text-red-600" />
                  <span className="font-semibold text-gray-900">{subject}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Batch Capacity</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${(selectedBatch.students / selectedBatch.capacity) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {selectedBatch.students} out of {selectedBatch.capacity} students enrolled (
              {Math.round((selectedBatch.students / selectedBatch.capacity) * 100)}% capacity)
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Ongoing Batches</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setViewType("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewType === "all" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            All Batches
          </button>
          <button
            onClick={() => setViewType("morning")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              viewType === "morning" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            <Sun size={16} />
            Morning
          </button>
          <button
            onClick={() => setViewType("evening")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              viewType === "evening" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            <Moon size={16} />
            Evening
          </button>
        </div>
      </div>

      {/* Batch Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Morning Batches */}
        {(viewType === "all" || viewType === "morning") && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Sun className="text-yellow-600" size={20} />
              </div>
              Morning Batches
            </h2>
            <div className="space-y-4">
              {batches
                .filter((batch) => batch.type === "morning")
                .map((batch) => (
                  <motion.div
                    key={batch.id}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="border border-yellow-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all bg-yellow-50"
                    onClick={() => setSelectedBatch(batch)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{batch.name}</h3>
                      <ChevronRight className="text-yellow-600" size={20} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Time:</p>
                        <p className="font-semibold text-gray-900">
                          {batch.startTime} - {batch.endTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Faculty:</p>
                        <p className="font-semibold text-gray-900">{batch.faculty}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Students:</p>
                        <p className="font-semibold text-yellow-600">
                          {batch.students}/{batch.capacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fees:</p>
                        <p className="font-semibold text-green-600">₹{batch.fees.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Evening Batches */}
        {(viewType === "all" || viewType === "evening") && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Moon className="text-blue-600" size={20} />
              </div>
              Evening Batches
            </h2>
            <div className="space-y-4">
              {batches
                .filter((batch) => batch.type === "evening")
                .map((batch) => (
                  <motion.div
                    key={batch.id}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="border border-blue-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all bg-blue-50"
                    onClick={() => setSelectedBatch(batch)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{batch.name}</h3>
                      <ChevronRight className="text-blue-600" size={20} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Time:</p>
                        <p className="font-semibold text-gray-900">
                          {batch.startTime} - {batch.endTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Faculty:</p>
                        <p className="font-semibold text-gray-900">{batch.faculty}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Students:</p>
                        <p className="font-semibold text-blue-600">
                          {batch.students}/{batch.capacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fees:</p>
                        <p className="font-semibold text-green-600">₹{batch.fees.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>

      {filteredBatches.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BookOpen size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No batches found</h3>
          <p className="text-gray-500">No {viewType} batches are currently available.</p>
        </div>
      )}
    </div>
  )
}

// Faculties List Component
const FacultiesList = ({ faculties }) => {
  const [selectedFaculty, setSelectedFaculty] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFaculties = faculties.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (selectedFaculty) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setSelectedFaculty(null)}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Faculty List
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {selectedFaculty.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedFaculty.name}</h1>
              <p className="text-xl text-gray-600">{selectedFaculty.subject}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Rating: {selectedFaculty.rating}/5.0
                </span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedFaculty.experience} Experience
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Contact Information</h3>
              <div className="space-y-4">
                {selectedFaculty.email && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="text-gray-500" size={20} />
                    <span className="text-gray-700">{selectedFaculty.email}</span>
                  </div>
                )}
                {selectedFaculty.phone && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="text-gray-500" size={20} />
                    <span className="text-gray-700">{selectedFaculty.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="text-gray-500" size={20} />
                  <span className="text-gray-700">Joined: {selectedFaculty.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Professional Details</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-1">Monthly Salary</p>
                  <p className="text-2xl font-bold text-green-600">₹{selectedFaculty.salary.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-1">Students Teaching</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedFaculty.students}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-1">Qualification</p>
                  <p className="text-lg font-semibold text-purple-600">{selectedFaculty.qualification}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Batches Teaching */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Batches Teaching</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedFaculty.batches.map((batch, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-900">{batch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Display */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Faculty Rating</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${(selectedFaculty.rating / 5) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{selectedFaculty.rating}/5.0 Student Rating</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Faculties List</h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search faculties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculties.map((faculty) => (
          <motion.div
            key={faculty.id}
            whileHover={{ y: -2, scale: 1.01 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all"
            onClick={() => setSelectedFaculty(faculty)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {faculty.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900">{faculty.name}</h3>
                <p className="text-gray-600">{faculty.subject}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Experience:</span>
                <span className="font-semibold text-gray-900">{faculty.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Students:</span>
                <span className="font-semibold text-blue-600">{faculty.students}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating:</span>
                <span className="font-semibold text-green-600">{faculty.rating}/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Salary:</span>
                <span className="font-semibold text-green-600">₹{faculty.salary.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Qualification:</p>
              <p className="font-semibold text-gray-900 text-sm">{faculty.qualification}</p>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(faculty.rating / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredFaculties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <GraduationCap size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No faculties found</h3>
          <p className="text-gray-500">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  )
}

// Organization Hierarchy Component
const OrganizationHierarchy = ({ departments }) => {
  // UPSC Organization Hierarchy
  const hierarchy = {
    director: { name: "Director - One Aim UPSC", position: "Director/CEO" },
    departments: [
      {
        name: "HR Department",
        head: { name: "Priya Sharma", position: "Head of HR" },
        subunits: [
          { name: "Finance", head: "Rahul Sinha" },
          { name: "Attendance", head: "Neha Gupta" },
          { name: "Performance", head: "Rohit Mehra" },
        ],
      },
      {
        name: "Sales Department",
        head: { name: "Ankit Jain", position: "Head of Sales" },
        subunits: [{ name: "Admissions", head: "Kavita Singh" }],
      },
      {
        name: "Faculty Department",
        head: { name: "Dr. Anil Kumar", position: "Faculty Head" },
        subunits: [],
      },
      {
        name: "IT Support",
        head: { name: "Sunil Verma", position: "IT Support Lead" },
        subunits: [
          { name: "Tele Callers", head: "Geeta Yadav" },
          { name: "Faculty IT Support", head: "Suresh Nair" },
        ],
      },
      {
        name: "Management",
        head: { name: "Shalini Bhatt", position: "Operations Manager" },
        subunits: [
          { name: "MIS", head: "Atul Mishra" },
          { name: "Reporting", head: "Pooja Arora" },
          { name: "AlignUp", head: "Sandeep Singh" },
          { name: "Team Lead", head: "Richa Thakur" },
          { name: "MIS Coordinator", head: "Vikram Joshi" },
        ],
      },
    ],
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Organization Hierarchy</h1>

      {/* Organization Hierarchy Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <Activity className="text-red-600" size={20} />
          </div>
          Complete Organization Structure
        </h2>
        <div className="flex flex-col items-center">
          {/* Director/CEO */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-xl mb-8 shadow-lg text-center min-w-[250px]"
          >
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award size={24} />
            </div>
            <h3 className="font-bold text-lg">{hierarchy.director.name}</h3>
            <p className="text-red-100">{hierarchy.director.position}</p>
          </motion.div>

          {/* Departments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {hierarchy.departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center w-full"
              >
                <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg mb-4 w-full text-center">
                  <p className="font-semibold text-red-800">{dept.head.name}</p>
                  <p className="text-sm text-red-600">{dept.head.position || dept.name}</p>
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
      </div>

      {/* Department Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
          <div className="p-2 bg-purple-100 rounded-lg">
            <BarChart3 className="text-purple-600" size={20} />
          </div>
          Department Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {departments.map((dept) => (
            <div key={dept.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-2xl font-bold text-red-600">
                {dept.managers + dept.coManagers + dept.employees + dept.interns}
              </p>
              <p className="text-gray-600 text-sm font-medium">{dept.name}</p>
              <p className="text-xs text-gray-500 mt-1">Total Members</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main Dashboard Component
export default function UPSCAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [departments, setDepartments] = useState(sampleDepartments)

  const handleDeleteMember = (departmentId, memberId) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) =>
        dept.id === departmentId ? { ...dept, members: dept.members.filter((member) => member.id !== memberId) } : dept,
      ),
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />
      case "sub-departments":
        return <SubDepartments departments={departments} onDeleteMember={handleDeleteMember} />
      case "ongoing-batches":
        return <OngoingBatches batches={sampleBatches} />
      case "faculties-list":
        return <FacultiesList faculties={sampleFaculties} />
      case "organization-hierarchy":
        return <OrganizationHierarchy departments={departments} />
      default:
        return <Overview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader activeTab={activeTab} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
