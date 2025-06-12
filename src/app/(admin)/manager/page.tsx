"use client";
import React, { useState } from 'react';
import { 
  User, 
  Users, 
  Building2, 
  Plus, 
  Bell, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Send,
  X
} from 'lucide-react';

const ManagerDashboard = () => {
  // Manager Info
  const [managerInfo] = useState({
    name: "Sarah Johnson",
    department: "Software Development",
    coManager: "Mike Chen",
    employeeCount: 12
  });

  // Projects State
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-commerce Platform Redesign",
      description: "Complete overhaul of the company's e-commerce platform with modern UI/UX",
      progress: 65,
      employees: ["Alice Smith", "Bob Wilson", "Carol Davis", "David Lee"]
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Native mobile app for iOS and Android platforms",
      progress: 30,
      employees: ["Emma Brown", "Frank Miller", "Grace Taylor"]
    },
    {
      id: 3,
      name: "API Integration",
      description: "Integration with third-party payment and shipping APIs",
      progress: 85,
      employees: ["Henry Clark", "Ivy Johnson"]
    }
  ]);

  // TODO State
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: "Review Q2 Performance Reports",
      department: "Analytics Team",
      assignedDate: "2024-06-10",
      responses: [
        { employee: "John Doe", response: "Completed the initial review. Found some discrepancies in the data.", timestamp: "2024-06-11 10:30 AM" },
        { employee: "Jane Smith", response: "Working on the visualization charts. Will submit by EOD.", timestamp: "2024-06-11 02:15 PM" }
      ]
    },
    {
      id: 2,
      task: "Update Security Protocols",
      department: "DevOps Team",
      assignedDate: "2024-06-08",
      responses: [
        { employee: "Alex Johnson", response: "Updated firewall rules and documented changes.", timestamp: "2024-06-09 11:45 AM" }
      ]
    }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, employee: "Alice Smith", message: "Submitted weekly report", time: "2 hours ago", type: "info" },
    { id: 2, employee: "Bob Wilson", message: "Requested time off for next week", time: "4 hours ago", type: "request" },
    { id: 3, employee: "Carol Davis", message: "Completed milestone 3", time: "1 day ago", type: "success" }
  ]);

  // Component States
  const [expandedTodo, setExpandedTodo] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewTodo, setShowNewTodo] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // New Project Form
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    employees: []
  });

  // New TODO Form
  const [newTodo, setNewTodo] = useState({
    task: '',
    department: ''
  });

  // Departments list
  const departments = ["Frontend Team", "Backend Team", "DevOps Team", "Analytics Team", "QA Team"];

  // Handle progress change
  const handleProgressChange = (projectId, newProgress) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, progress: newProgress } : project
    ));
  };

  // Handle new project submission
  const handleNewProjectSubmit = () => {
    if (newProject.name && newProject.description) {
      const project = {
        id: projects.length + 1,
        name: newProject.name,
        description: newProject.description,
        progress: 0,
        employees: newProject.employees
      };
      setProjects([...projects, project]);
      setNewProject({ name: '', description: '', employees: [] });
      setShowNewProject(false);
    }
  };

  // Handle new TODO submission
  const handleNewTodoSubmit = () => {
    if (newTodo.task && newTodo.department) {
      const todo = {
        id: todos.length + 1,
        task: newTodo.task,
        department: newTodo.department,
        assignedDate: new Date().toISOString().split('T')[0],
        responses: []
      };
      setTodos([...todos, todo]);
      setNewTodo({ task: '', department: '' });
      setShowNewTodo(false);
    }
  };

  // Clear notification
  const clearNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{managerInfo.name}</h1>
                <div className="flex items-center space-x-4 mt-2 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Building2 className="w-4 h-4" />
                    <span>{managerInfo.department}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Co-Manager: {managerInfo.coManager}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{managerInfo.employeeCount} Employees</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className="p-3 border-b hover:bg-gray-50 flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {notification.type === 'request' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                            {notification.type === 'info' && <Bell className="w-4 h-4 text-blue-500" />}
                            <span className="font-medium text-sm">{notification.employee}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                        <button
                          onClick={() => clearNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Ongoing Projects</h2>
            <button
              onClick={() => setShowNewProject(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="grid gap-4">
            {projects.map(project => (
              <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-500">{project.progress}%</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={project.progress}
                    onChange={(e) => handleProgressChange(project.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                {/* Employees */}
                <div>
                  <span className="text-sm font-medium text-gray-700">Team Members:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.employees.map((employee, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {employee}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TODO Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Department Tasks</h2>
            <button
              onClick={() => setShowNewTodo(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Assign Task</span>
            </button>
          </div>

          <div className="space-y-4">
            {todos.map(todo => (
              <div key={todo.id} className="border rounded-lg">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedTodo(expandedTodo === todo.id ? null : todo.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{todo.task}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          {todo.department}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Assigned: {todo.assignedDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{todo.responses.length} Responses</span>
                        </div>
                      </div>
                    </div>
                    {expandedTodo === todo.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
                
                {expandedTodo === todo.id && (
                  <div className="border-t p-4 bg-gray-50">
                    <h4 className="font-medium mb-3">Employee Responses:</h4>
                    {todo.responses.length > 0 ? (
                      <div className="space-y-3">
                        {todo.responses.map((response, index) => (
                          <div key={index} className="bg-white p-3 rounded border">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-blue-600">{response.employee}</span>
                              <span className="text-xs text-gray-500">{response.timestamp}</span>
                            </div>
                            <p className="text-gray-700">{response.response}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No responses yet</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* New Project Modal */}
        {showNewProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewProject(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleNewProjectSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New TODO Modal */}
        {showNewTodo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Assign New Task</h3>
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
                    <textarea
                      value={newTodo.task}
                      onChange={(e) => setNewTodo({...newTodo, task: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows="3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      value={newTodo.department}
                      onChange={(e) => setNewTodo({...newTodo, department: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewTodo(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleNewTodoSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Assign Task</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default ManagerDashboard;