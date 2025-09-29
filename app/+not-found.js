// app/+not-found.js
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    View.createElement(View, { style: styles.container },
      View.createElement(Text, { style: styles.title }, "Page Nahin Mila"),
      View.createElement(Text, { style: styles.message }, 
        "Aap jo page dhoond rahe hain woh exist nahi karta"
      ),
      
      View.createElement(Link, { href: "/", style: styles.button },
        View.createElement(Text, { style: styles.buttonText }, "Home Par Wapas Jayein")
      ),
      
      View.createElement(Link, { href: "/auth/login", style: styles.button },
        View.createElement(Text, { style: styles.buttonText }, "Login Karain")
      )
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});