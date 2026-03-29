import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('login');

  const LoginView = () => {
    const { control, handleSubmit } = useForm();
    return (
      <View style={styles.card}>
        <Text style={styles.header}>Sign In</Text>
        <Controller control={control} name="email" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.field} placeholder="Email" onChangeText={onChange} value={value} />
          )}
        />
        <Controller control={control} name="password" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.field} placeholder="Password" secureTextEntry onChangeText={onChange} value={value} />
          )}
        />
        <TouchableOpacity style={styles.actionBtn} onPress={handleSubmit(() => setScreen('home'))}>
          <Text style={styles.btnLabel}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('register')}>
          <Text style={styles.switchText}>New here? Register</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RegisterView = () => {
    const { control, handleSubmit, watch } = useForm();
    const pwd = watch("password");

    return (
      <View style={styles.card}>
        <Text style={styles.header}>Register</Text>
        <Controller control={control} name="email" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.field} placeholder="Email" onChangeText={onChange} value={value} />
          )}
        />
        <Controller control={control} name="password" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.field} placeholder="Password" secureTextEntry onChangeText={onChange} value={value} />
          )}
        />
        <Controller control={control} name="confirm" rules={{ validate: v => v === pwd || "No match" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.field} placeholder="Confirm Password" secureTextEntry onChangeText={onChange} value={value} />
          )}
        />
        <TouchableOpacity style={styles.actionBtn} onPress={handleSubmit(() => setScreen('setup'))}>
          <Text style={styles.btnLabel}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.switchText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const SetupView = () => {
    const { control, handleSubmit } = useForm();
    return (
      <View style={styles.card}>
        <Text style={styles.header}>Setup Profile</Text>
        <TextInput style={styles.field} placeholder="Photo URL" />
        <Controller control={control} name="fName" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.field} placeholder="First Name" onChangeText={onChange} value={value} />
          )}
        />
        <Controller control={control} name="lName" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.field} placeholder="Last Name" onChangeText={onChange} value={value} />
          )}
        />
        <TouchableOpacity style={styles.actionBtn} onPress={handleSubmit(() => setScreen('home'))}>
          <Text style={styles.btnLabel}>FINISH SETUP</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const HomeView = () => (
    <View style={styles.card}>
      <Text style={styles.header}>Homepage</Text>
      <Text style={{ textAlign: 'center', marginBottom: 30 }}>You have successfully logged in!</Text>
      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#333' }]} onPress={() => setScreen('login')}>
        <Text style={styles.btnLabel}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        {screen === 'login' && <LoginView />}
        {screen === 'register' && <RegisterView />}
        {screen === 'setup' && <SetupView />}
        {screen === 'home' && <HomeView />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff8f0' },
  scrollArea: { flexGrow: 1, justifyContent: 'center', padding: 25 },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 12, elevation: 5 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#f57c00', marginBottom: 20, textAlign: 'center' },
  field: { borderBottomWidth: 1.5, borderBottomColor: '#ffb74d', padding: 10, marginBottom: 15, fontSize: 16 },
  actionBtn: { backgroundColor: '#fb8c00', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnLabel: { color: '#fff', fontWeight: 'bold' },
  switchText: { color: '#ef6c00', marginTop: 20, textAlign: 'center' }
});