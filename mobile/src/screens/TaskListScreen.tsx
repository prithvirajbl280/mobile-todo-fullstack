import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setTasks, deleteTask } from '../store/tasksSlice';
import { logout } from '../store/authSlice';
import axios from 'axios';

import { API_URL } from '../config';

const TaskListScreen = ({ navigation }: any) => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(setTasks(response.data));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(deleteTask(id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button title="Add Task" onPress={() => navigation.navigate('TaskForm')} />
                <Button title="Logout" onPress={handleLogout} color="red" />
            </View>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <View>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <Text>{item.description}</Text>
                            <Text>Priority: {item.priority}</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button title="Edit" onPress={() => navigation.navigate('TaskForm', { task: item })} />
                            <Button title="Delete" onPress={() => handleDelete(item._id)} color="red" />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    taskItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    taskTitle: { fontSize: 18, fontWeight: 'bold' },
    actions: { flexDirection: 'row', gap: 10 },
});

export default TaskListScreen;
