import React from 'react';
import ActivityFeed from './ActivityFeed';
import MyTasksList from './MyTasksList';

export default function ActivityAndTasks() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
      <ActivityFeed />
      <MyTasksList />
    </div>
  );
}