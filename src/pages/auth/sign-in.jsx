import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const SignIn = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://localhost:5051/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Hapus token lama jika ada dan simpan token baru untuk 7 hari
        Cookies.remove("authToken"); // Hapus token lama
        Cookies.set("authToken", token, { expires: 7 }); // Simpan token baru selama 7 hari

        alert("Login berhasil!");
        navigate("/dashboard/home");
      } else if (response.status === 401) {
        // Jika respons menunjukkan token kadaluwarsa
        alert("Sesi Anda telah berakhir. Silakan login kembali untuk memperbarui token.");
        Cookies.remove("authToken"); // Hapus token lama yang sudah kadaluwarsa
        navigate("/login"); // Arahkan pengguna ke halaman login
      } else {
        alert("Username atau password salah!");
      }
    } catch (error) {
      console.error("Error saat login:", error);
      alert("Terjadi kesalahan saat login. Silakan coba lagi.");
    }
  };

  return (
    <div
      className="text-white h-[100vh] flex items-center justify-center bg-cover"
      style={{ backgroundImage: `url('/img/BG2.jpg')` }}
    >
      <div className="bg-slate-800 border rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="relative my-4">
            <input
              type="text"
              name="username"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              className="absolute text-sm duration-300 transform scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-valid:scale-75 peer-valid:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="password"
              name="password"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              className="absolute text-sm duration-300 transform scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-valid:scale-75 peer-valid:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded bg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
