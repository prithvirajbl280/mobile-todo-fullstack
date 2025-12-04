import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addTask, updateTask } from '../store/tasksSlice';
import axios from 'axios';

import { API_URL } from '../config';

const TaskFormScreen = ({ route, navigation }: any) => {
    const task = route.params?.task;
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [priority, setPriority] = useState(task?.priority || 'Medium');
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            if (task) {
                const response = await axios.patch(
                    `${API_URL}/tasks/${task._id}`,
                    { title, description, priority },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                dispatch(updateTask(response.data));
            } else {
                const response = await axios.post(
                    `${API_URL}/tasks`,
                    { title, description, priority },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                dispatch(addTask(response.data));
            }
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} />

            <Text style={styles.label}>Priority (Low, Medium, High)</Text>
            <TextInput style={styles.input} value={priority} onChangeText={setPriority} />

            <Button title={task ? 'Update Task' : 'Add Task'} onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { fontSize: 16, marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
});

export default TaskFormScreen;
