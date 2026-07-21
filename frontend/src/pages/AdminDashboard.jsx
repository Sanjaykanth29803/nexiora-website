import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Download, LayoutDashboard, Users, MessageSquare, Briefcase, ChevronLeft, ChevronRight, LogOut, CheckCircle, Clock, Send, PlayCircle, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('enquiries');
  const [enquiries, setEnquiries] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [waitlist, setWaitlist] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [adminInitials, setAdminInitials] = useState('AD');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get admin initials
    const userStr = localStorage.getItem('adminUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const name = user.username || user.email || 'Admin';
        setAdminInitials(name.substring(0, 2).toUpperCase());
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };

      if (activeTab === 'enquiries') {
        const response = await axios.get('/api/enquiries', { headers });
        if (response.data.success) setEnquiries(response.data.data);
      } else if (activeTab === 'analytics') {
        const response = await axios.get('/api/admin/analytics', { headers });
        if (response.data.success) setAnalytics(response.data.data);
      } else if (activeTab === 'waitlist') {
        const response = await axios.get('/api/admin/waitlist', { headers });
        if (response.data.success) setWaitlist(response.data.data);
      }
    } catch (err) {
      console.error(`Failed to fetch ${activeTab}:`, err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`/api/enquiries/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setEnquiries(prev => prev.map(enq => enq._id === id ? { ...enq, status: newStatus } : enq));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.delete(`/api/enquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setEnquiries(prev => prev.filter(enq => enq._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
      alert('Failed to delete enquiry.');
    }
  };

  const exportCSV = () => {
    if (activeTab !== 'enquiries') return;
    
    const headers = ['Enquiry ID', 'Customer Name', 'Company Name', 'Email', 'Phone', 'Industry', 'Required Service', 'Budget', 'Status', 'Date Received'];
    const csvContent = [
      headers.join(','),
      ...filteredEnquiries.map(e => 
        [
          e.enquiryId,
          `"${e.customerName}"`,
          `"${e.companyName || ''}"`,
          e.email,
          e.phone,
          `"${e.industry}"`,
          `"${e.requiredService}"`,
          `"${e.budget}"`,
          e.status,
          new Date(e.createdAt).toLocaleDateString()
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nexiora_enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Received': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Discussion Scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Proposal Sent': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Project Started': return 'bg-green-100 text-green-800 border-green-200';
      case 'Completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredEnquiries = enquiries.filter(enq => {
    const matchesSearch = enq.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (enq.companyName && enq.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          enq.enquiryId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight text-white mb-2">
            Nexiora<span className="text-gold-500">.</span> Admin
          </h2>
          <p className="text-xs text-gray-400">Lead Management System</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2">
          <button 
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors border ${activeTab === 'enquiries' ? 'bg-navy-800 text-gold-500 border-navy-700' : 'text-gray-400 border-transparent hover:text-white hover:bg-navy-800'}`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="font-medium">Lead Enquiries</span>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors border ${activeTab === 'analytics' ? 'bg-navy-800 text-gold-500 border-navy-700' : 'text-gray-400 border-transparent hover:text-white hover:bg-navy-800'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Analytics Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('waitlist')}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors border ${activeTab === 'waitlist' ? 'bg-navy-800 text-gold-500 border-navy-700' : 'text-gray-400 border-transparent hover:text-white hover:bg-navy-800'}`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Waitlist Users</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-navy-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-10 flex justify-between items-center shadow-sm z-10">
          <h1 className="text-2xl font-bold text-navy-900 capitalize">
            {activeTab === 'enquiries' ? 'Enquiries' : activeTab === 'analytics' ? 'Analytics Overview' : 'Waitlist Users'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 font-bold uppercase">
              {adminInitials}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6 md:p-10">
          
          {/* ENQUIRIES TAB */}
          {activeTab === 'enquiries' && (
            <>
              {/* Stats row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Enquiries</p>
                  <h3 className="text-3xl font-bold text-navy-900">{enquiries.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-500 mb-1">New Received</p>
                  <h3 className="text-3xl font-bold text-blue-600">
                    {enquiries.filter(e => e.status === 'Received').length}
                  </h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-500 mb-1">In Pipeline</p>
                  <h3 className="text-3xl font-bold text-gold-600">
                    {enquiries.filter(e => ['Discussion Scheduled', 'Proposal Sent'].includes(e.status)).length}
                  </h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</p>
                  <h3 className="text-3xl font-bold text-green-600">
                    {enquiries.length > 0 ? Math.round((enquiries.filter(e => e.status === 'Completed').length / enquiries.length) * 100) : 0}%
                  </h3>
                </div>
              </div>

              {/* Controls row */}
              <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search by ID, name, or company..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-900 outline-none text-sm"
                  />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter className="h-4 w-4 text-gray-500" />
                    </div>
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-9 w-full md:w-auto p-2.5 border border-gray-300 rounded-lg outline-none text-sm appearance-none pr-8"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Received">Received</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Discussion Scheduled">Discussion Scheduled</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Project Started">Project Started</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  
                  <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4">Enquiry ID</th>
                        <th className="px-6 py-4">Customer Details</th>
                        <th className="px-6 py-4">Required Service</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Date Received</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-8 text-center text-gray-500">Loading enquiries...</td>
                        </tr>
                      ) : filteredEnquiries.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No enquiries found matching your filters.</td>
                        </tr>
                      ) : (
                        filteredEnquiries.map((enq) => (
                          <tr key={enq._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-navy-900">{enq.enquiryId}</td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{enq.customerName}</div>
                              <div className="text-gray-500 text-xs">{enq.companyName || enq.email}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="truncate max-w-xs">{enq.requiredService}</div>
                              <div className="text-gray-500 text-xs">{enq.industry}</div>
                            </td>
                            <td className="px-6 py-4">
                              <select
                                value={enq.status}
                                onChange={(e) => handleStatusUpdate(enq._id, e.target.value)}
                                className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold border outline-none cursor-pointer transition-colors ${getStatusColor(enq.status)}`}
                              >
                                <option value="Received">Received</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Discussion Scheduled">Discussion Scheduled</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Project Started">Project Started</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {new Date(enq.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => handleDeleteEnquiry(enq._id)} 
                                className="text-red-400 hover:text-red-600 transition-colors p-1"
                                title="Delete Enquiry"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Showing {filteredEnquiries.length} of {enquiries.length} results
                  </span>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded border border-gray-300 text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-1.5 rounded border border-gray-300 text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div>
              {loading ? (
                <p className="text-gray-500">Loading analytics...</p>
              ) : analytics ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Waitlist Signups</p>
                      <h3 className="text-3xl font-bold text-navy-900">{analytics.counts?.waitlist || 0}</h3>
                    </div>
                    <Users className="w-10 h-10 text-gold-500 opacity-80" />
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Contact Messages</p>
                      <h3 className="text-3xl font-bold text-navy-900">{analytics.counts?.contacts || 0}</h3>
                    </div>
                    <MessageSquare className="w-10 h-10 text-gold-500 opacity-80" />
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
                      <h3 className="text-3xl font-bold text-navy-900">{analytics.counts?.users || 0}</h3>
                    </div>
                    <Briefcase className="w-10 h-10 text-gold-500 opacity-80" />
                  </div>
                </div>
              ) : (
                <p className="text-red-500">Failed to load analytics data.</p>
              )}
            </div>
          )}

          {/* WAITLIST TAB */}
          {activeTab === 'waitlist' && (
            <div>
              {loading ? (
                <p className="text-gray-500">Loading waitlist users...</p>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Role</th>
                          <th className="px-6 py-4">Company</th>
                          <th className="px-6 py-4">Date Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800">
                        {waitlist.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No waitlist users found.</td>
                          </tr>
                        ) : (
                          waitlist.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-navy-900">{user.name}</td>
                              <td className="px-6 py-4 text-gray-600">{user.email}</td>
                              <td className="px-6 py-4 text-gray-600">{user.role}</td>
                              <td className="px-6 py-4 text-gray-600">{user.company}</td>
                              <td className="px-6 py-4 text-gray-500">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
