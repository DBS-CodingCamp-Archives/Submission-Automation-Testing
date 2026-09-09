import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

function RegisterInput({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ name, email, password });
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400"
          htmlFor="reg-name"
        >
          <span className="flex items-center gap-2">
            <User size={16} />
            Nama Lengkap
          </span>
        </label>
        <input
          id="reg-name"
          type="text"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400"
          htmlFor="reg-email"
        >
          <span className="flex items-center gap-2">
            <Mail size={16} />
            Email
          </span>
        </label>
        <input
          id="reg-email"
          type="email"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400"
          htmlFor="reg-password"
        >
          <span className="flex items-center gap-2">
            <Lock size={16} />
            Password
          </span>
        </label>
        <div className="relative">
          <input
            id="reg-password"
            type={showPass ? 'text' : 'password'}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-4 pr-11 py-3 text-sm text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
            placeholder="Minimal 6 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
      >
        <User size={18} />
        Daftar Sekarang
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
