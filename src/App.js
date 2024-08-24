import React, { useState } from 'react';
import { Input, Button, List, Typography, message } from 'antd';

const { Text } = Typography;

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (!task) {
      message.error('Task cannot be empty');
      return;
    }
    setTasks([...tasks, task]);
    setTask(''); // Clear the input after adding
    message.success('Task added successfully');
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    message.info('Task removed');
  };

  return (
    <div style={{ margin: '50px auto', width: '400px' }}>
      <h1>To-Do List</h1>
      <Input
        placeholder="Enter a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onPressEnter={addTask}
      />
      <Button type="primary" onClick={addTask} style={{ marginTop: '10px' }}>
        Add Task
      </Button>

      <List
        style={{ marginTop: '20px' }}
        bordered
        dataSource={tasks}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button danger onClick={() => removeTask(index)}>
                Remove
              </Button>,
            ]}
          >
            <Text>{item}</Text>
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
