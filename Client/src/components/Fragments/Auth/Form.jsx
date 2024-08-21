"use client";

import { Button, Label, TextInput } from "flowbite-react";
import axios from 'axios';

export function LoginForm() {
  return (
    <form className="flex w-full flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label className="text-white" htmlFor="email" value="Alamat Email" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="contoh@mail.com"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label className="text-white" htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>
      <Button color="warning" type="submit">
        Kirim
      </Button>
    </form>
  );
}

export function RegisterForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const role = event.target.role.value;

    try {
      const response = await axios.post('http://localhost:8080/register', {
        username,
        email,
        password,
        role
      });
      if (response.status === 200) {
        // Redirect ke halaman login
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };


  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label className="text-white" htmlFor="username" value="Username" />
        </div>
        <TextInput id="username" type="text" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label className="text-white" htmlFor="email" value="Alamat Email" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="contoh@mail.com"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label className="text-white" htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label className="text-white" htmlFor="role" value="Role" />
        </div>
        <select id="role" className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" required>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <Button color="warning" type="submit">
        Kirim
      </Button>
    </form>
  );
}