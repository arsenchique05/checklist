
import React, { useState } from 'react';
import { Input, Button, List, Checkbox, Typography, message } from 'antd';
import './App.css'; 

const { Text } = Typography;

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (!task) {
      message.error('Task cannot be empty, fill smth');
      return;
    }
    setTasks([...tasks, { text: task, completed: false }]);
    setTask('');
    message.success('Task was added brother');
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    message.info('Task removed');
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      <Input
        className="task-input"
        placeholder="What's on your mind today "
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onPressEnter={addTask}
      />
      <Button type="primary" onClick={addTask}>
        Add Task
      </Button>

      <List
        className="task-list"
        bordered
        dataSource={tasks}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Checkbox checked={item.completed} onChange={() => toggleTaskCompletion(index)} />,
              <Button danger onClick={() => removeTask(index)}>
                Remove
              </Button>,
            ]}
          >
            <Text delete={item.completed} className={item.completed ? 'completed-task' : ''}>
              {item.text}
            </Text>
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
