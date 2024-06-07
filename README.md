# HackPulse


Welcome to **HackPulse**, a fullstack platform for hosting and participating in local hackathons. Built using Next.js 14, this project leverages server-side rendering to deliver a seamless user experience.
<br>
You can checkout the deployed version @ https://hackpulsex.vercel.app
![image](https://github.com/SidhantCodes/HackPulse/assets/127239653/25fe562d-738c-4e5b-92af-065a17a81603)


## Features

- **Host Hackathons**: Easily set up and manage hackathons in your community.
- **Participate in Hackathons**: Browse and join hackathons happening around you.
- **User Authentication**: Secure authentication implemented using Clerk.
- **Responsive UI**: Beautiful and responsive UI components from Shadcn UI library.

## Tech Stack

- **Next.js 14**: For building the frontend and backend, utilizing its server-side rendering capabilities.
- **Clerk**: For user authentication and management.
- **Shadcn UI Library**: For pre-built, customizable UI components.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/SidhantCodes/HackPulse
    cd HackPulse
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env.local` file in the root directory and add your Clerk credentials and any other necessary environment variables:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
    CLERK_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
    
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    
    MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster-name.mongodb.net/
    
    WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
    UPLOADTHING_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxx
    UPLOADTHING_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxx
    
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
    STRIPE_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
    
    STRIPE_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
    
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000

    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

Once the server is running, you can:

- **Sign Up/Log In**: Use the Clerk authentication system to create an account or log in.
- **Host a Hackathon**: Navigate to the "Host Hackathon" section and fill out the required details.
- **Browse Hackathons**: Explore the "Discover Hackathons" section to find and join events in your area.

## Note

This project is currently a work in progress. The payment logic using Stripe is pending implementation. Feel free to explore the existing features, but keep in mind that additional functionality is yet to be added.




