📨 WalletX - Digital Wallet API
📖 Project Overview

WalletX হলো একটি নিরাপদ ও আধুনিক Digital Wallet Management System যেখানে ব্যবহারকারীরা তাদের অ্যাকাউন্ট তৈরি করতে পারে, টাকা যোগ করতে পারে, ট্রান্সফার করতে পারে, ক্যাশ আউট করতে পারে এবং এজেন্ট হতে আবেদন করতে পারে।
এই সিস্টেমটি তৈরি করা হয়েছে Express.js, MongoDB, এবং TypeScript ব্যবহার করে একটি মডুলার ও স্কেলেবল আর্কিটেকচারে।

✨ Features

✅ User Registration & Login (JWT Authentication)
✅ Admin, User, and Agent Role-based Authorization
✅ Add Money, Send Money, and Cash Out System
✅ Transaction History Tracking
✅ Agent Application System (User → Admin Approval)
✅ Global Error Handling & Validation (Zod)
✅ MongoDB with Mongoose ORM
✅ Secure Password Hashing (bcrypt)
✅ Environment-based Configuration

🧱 Tech Stack
Category Technology
Backend Framework	Express.js
Language	TypeScript
Database	MongoDB (Mongoose ORM)
Authentication	JSON Web Token (JWT)
Validation	Zod
Environment Management	dotenv
Deployment	Vercel

🧩 Folder Structure


src/
 ┣ app/
 ┃ ┣ module/
 ┃ ┃ ┣ user/
 ┃ ┃ ┣ agent/
 ┃ ┃ ┣ wallet/
 ┃ ┃ ┗ transaction/
 ┃ ┣ utils/
 ┃ ┣ middleware/
 ┃ ┗ route/
 ┣ GlobalError/
 ┣ server.ts
 ┣ app.ts
 ┗ config/

##Auth


https://wallet-x-sable.vercel.app/api/v1/auth/login 

https://wallet-x-sable.vercel.app/api/v1/auth/logout

https://wallet-x-sable.vercel.app/api/v1/auth/resetPassword

##User
https://wallet-x-sable.vercel.app/api/v1/user/create

https://wallet-x-sable.vercel.app/api/v1/user/allUsers  (Admin Only)

https://wallet-x-sable.vercel.app/api/v1/user/68e45f5a1358d1ebbd52ddc4

##Wallet
https://wallet-x-sable.vercel.app/api/v1/wallet/send-money

https://wallet-x-sable.vercel.app/api/v1/wallet/add-money

https://wallet-x-sable.vercel.app/api/v1/wallet/cash-out  (only Agent number)

https://wallet-x-sable.vercel.app/api/v1/wallet/transaction  (My transaction)

https://wallet-x-sable.vercel.app/api/v1/wallet/me(My Account)

##Agent
https://wallet-x-sable.vercel.app/api/v1/wallet/agent/cash-in(Only Agent cash in user account)

##Become a Agent Apply
https://wallet-x-sable.vercel.app/api/v1/become-agent/apply-agent

https://wallet-x-sable.vercel.app/v1/become-agent/all-aplication(Only Admin)



##Backend live link :
https://wallet-x-sable.vercel.app/



