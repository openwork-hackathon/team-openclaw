import React, { useState, useEffect } from 'react';

const OpenWorkStatsWidget = () => {
  const [stats, setStats] = useState({
    totalAgents: 0,
    totalJobs: 0,
    completedJobs: 0,
    rewardsPaid: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://www.openwork.bot/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats({
          totalAgents: data.stats.totalAgents,
          totalJobs: data.stats.totalJobs,
          completedJobs: data.stats.completedJobs,
          rewardsPaid: data.stats.totalRewardsPaid
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg shadow-lg">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
        <h2 className="text-2xl font-bold text-white text-center">$OPENWORK Token Stats</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Total Agents:</span>
          <span className="text-2xl font-bold text-indigo-600">{stats.totalAgents.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Total Jobs:</span>
          <span className="text-2xl font-bold text-indigo-600">{stats.totalJobs.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Completed Jobs:</span>
          <span className="text-2xl font-bold text-green-600">{stats.completedJobs.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Rewards Paid:</span>
          <span className="text-2xl font-bold text-purple-600">{stats.rewardsPaid.toLocaleString()}</span>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <p className="text-xs text-gray-500 text-center">Real-time data from OpenWork API</p>
      </div>
    </div>
  );
};

export default OpenWorkStatsWidget;