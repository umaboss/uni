
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, Calendar, Bell, FileText } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Total Students", value: "2,543", icon: Users, color: "bg-blue-500", change: "+12%" },
    { title: "Total Faculty", value: "156", icon: GraduationCap, color: "bg-green-500", change: "+3%" },
    { title: "Active Courses", value: "89", icon: BookOpen, color: "bg-purple-500", change: "+8%" },
    { title: "Revenue", value: "$45,780", icon: DollarSign, color: "bg-orange-500", change: "+15%" }
  ];

  const recentActivities = [
    { activity: "New student enrollment: John Doe", time: "2 minutes ago", type: "enrollment" },
    { activity: "Faculty meeting scheduled", time: "1 hour ago", type: "meeting" },
    { activity: "Course CS101 updated", time: "3 hours ago", type: "course" },
    { activity: "Payment received from Jane Smith", time: "5 hours ago", type: "payment" },
    { activity: "Library book returned", time: "1 day ago", type: "library" }
  ];

  const upcomingEvents = [
    { event: "Faculty Meeting", date: "Dec 15, 2024", time: "10:00 AM" },
    { event: "Student Orientation", date: "Dec 18, 2024", time: "2:00 PM" },
    { event: "Final Exams Begin", date: "Dec 20, 2024", time: "9:00 AM" },
    { event: "Holiday Break Starts", date: "Dec 23, 2024", time: "All Day" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-[#0B6D76] rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-blue-100">Here's what's happening at your university today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`${stat.color} bg-black p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.activity}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 mt-4 py-2 border-t border-gray-200">
            View All Activities
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">{event.event}</p>
                  <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                </div>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 mt-4 py-2 border-t border-gray-200">
            View Calendar
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Add Student", icon: Users, color: "bg-blue-500" },
            { name: "Add Faculty", icon: GraduationCap, color: "bg-green-500" },
            { name: "Create Course", icon: BookOpen, color: "bg-purple-500" },
            { name: "Generate Report", icon: FileText, color: "bg-orange-500" }
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className={`${action.color} p-3 rounded-lg mb-2`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
