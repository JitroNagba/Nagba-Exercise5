import React, { createContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ThemeProvider = createContext();

export default function App() {
  const [currentView, setCurrentView] = useState('login');
  const [isDark, setIsDark] = useState(false);

  const colors = {
    bg: isDark ? '#1a202c' : '#f7fafc',
    card: isDark ? '#2d3748' : '#ffffff',
    text: isDark ? '#edf2f7' : '#2d3748',
    input: isDark ? '#4a5568' : '#edf2f7',
    primary: '#4a90e2',
  };

  const toggleMode = () => setIsDark(!isDark);

  const LoginView = () => {
    const { control, handleSubmit } = useForm();
    return (
      <View style={[styles.box, { backgroundColor: colors.card }]}>
        <Text style={[styles.header, { color: colors.text }]}>Member Login</Text>
        <Controller control={control} name="email" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.inputField, { backgroundColor: colors.input, color: colors.text }]} 
              placeholder="Email" onChangeText={onChange} value={value} placeholderTextColor="#a0aec0" />
          )}
        />
        <Controller control={control} name="password" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.inputField, { backgroundColor: colors.input, color: colors.text }]} 
              placeholder="Password" secureTextEntry onChangeText={onChange} value={value} placeholderTextColor="#a0aec0" />
          )}
        />
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]} onPress={handleSubmit(() => setCurrentView('home'))}>
          <Text style={styles.btnText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentView('register')}>
          <Text style={[styles.link, { color: colors.primary }]}>Create an account</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RegisterView = () => {
    const { control, handleSubmit, watch } = useForm();
    const pwd = watch("password");
    return (
      <View style={[styles.box, { backgroundColor: colors.card }]}>
        <Text style={[styles.header, { color: colors.text }]}>New Account</Text>
        <Controller control={control} name="email" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.inputField, { backgroundColor: colors.input, color: colors.text }]} placeholder="Email" onChangeText={onChange} value={value} />
          )}
        />
        <Controller control={control} name="password" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.inputField, { backgroundColor: colors.input, color: colors.text }]} placeholder="Password" secureTextEntry onChangeText={onChange} value={value} />
          )}
        />
        <Controller control={control} name="confirm" rules={{ validate: v => v === pwd }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.inputField, { backgroundColor: colors.input, color: colors.text }]} placeholder="Confirm Password" secureTextEntry onChangeText={onChange} value={value} />
          )}
        />
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]} onPress={handleSubmit(() => setCurrentView('setup'))}>
          <Text style={styles.btnText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentView('login')}>
          <Text style={[styles.link, { color: colors.primary }]}>Back to login</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const SetupView = () => {
    const { control, handleSubmit } = useForm();
    return (
      <View style={[styles.box, { backgroundColor: colors.card }]}>
        <Text style={[styles.header, { color: colors.text }]}>Setup Profile</Text>
        <Controller control={control} name="firstName" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.inputField, { backgroundColor: colors.input, color: colors.text }]} placeholder="First Name" onChangeText={onChange} value={value} />
          )}
        />
        <Controller control={control} name="lastName" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.inputField, { backgroundColor: colors.input, color: colors.text }]} placeholder="Last Name" onChangeText={onChange} value={value} />
          )}
        />
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]} onPress={handleSubmit(() => setCurrentView('home'))}>
          <Text style={styles.btnText}>COMPLETE</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const HomeView = () => (
    <View style={[styles.box, { backgroundColor: colors.card }]}>
      <Text style={[styles.header, { color: colors.text }]}>Welcome Home</Text>
      <View style={styles.switchContainer}>
        <Text style={{ color: colors.text }}>Theme: {isDark ? 'Dark' : 'Light'}</Text>
        <Switch value={isDark} onValueChange={toggleMode} thumbColor={colors.primary} />
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => setCurrentView('login')}>
        <Text style={styles.btnText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemeProvider.Provider value={{ isDark, toggleMode }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScrollView contentContainerStyle={styles.container}>
          {currentView === 'login' && <LoginView />}
          {currentView === 'register' && <RegisterView />}
          {currentView === 'setup' && <SetupView />}
          {currentView === 'home' && <HomeView />}
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  box: { padding: 30, borderRadius: 20, elevation: 8, shadowColor: '#000' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  inputField: { padding: 15, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  actionBtn: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 20, textAlign: 'center', fontWeight: '600' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 },
  logoutBtn: { backgroundColor: '#e53e3e', padding: 15, borderRadius: 12, alignItems: 'center' }
});