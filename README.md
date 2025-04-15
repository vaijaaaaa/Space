# Space

Space is a personal Instagram-like social application built with React Native, designed to provide a private space for sharing moments and memories.

![Space Logo](/api/placeholder/200/200)

## About

Space is a minimalist, performance-focused social sharing platform built with React Native. Unlike traditional social networks, Space emphasizes privacy and personal control, allowing users to create their own intimate digital space for sharing moments with close connections.

## Features

- **Personal Feed**: Scrollable timeline of photos and videos from your connections
- **Media Upload**: Share photos and videos directly from your camera or gallery
- **Stories**: Ephemeral content that disappears after 24 hours
- **Direct Messaging**: Private conversations with individuals or groups
- **User Profiles**: Customizable profiles with bio and avatar
- **Search & Discovery**: Find and connect with friends
- **Notifications**: Stay updated with likes, comments, and follows
- **Dark Mode**: Easy on the eyes during nighttime browsing

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Convex for real-time database and backend functions
- **Authentication**: Clerk for user authentication and management
- **State Management**: React Context API or Redux
- **Navigation**: React Navigation
- **UI Animations**: React Native Reanimated
- **Media Handling**: Expo Camera and Media Library
  
## Screens
{"type":"excalidraw/clipboard","workspaceId":"Yo3aGP6vkQJj4fjzJbNd","elements":[{"modifiedBy":"3NbLt7WeRvdEhyubGCpaY6V7avV2","modifiedAt":1744733808645,"userId":"3NbLt7WeRvdEhyubGCpaY6V7avV2","id":"72asg6bK7hDgVaY4RAiQo","x":23786.140908446134,"y":-2743.330931236555,"version":939,"versionNonce":89679774,"backgroundColor":"transparent","fillStyle":"solid","opacity":100,"roughness":1,"strokeColor":"#000000","strokeSharpness":"sharp","strokeStyle":"solid","strokeWidth":1,"url":"workspaces/HmXLppkOu2ThJmA3jX6b/WDnvNa0BYzRmrnHcKcqkwRxUBfG3/_uFP-7CpCCiE3cnLtAGCE.png","mimeType":"image/png","size":370182,"type":"image","width":908,"height":1916,"angle":0,"groupIds":[],"lockedGroupId":null,"seed":2036028640,"isDeleted":false,"boundElementIds":null,"zIndex":48}]}

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/space-react-native.git

# Navigate to project directory
cd space-react-native

# Install dependencies
npm install

# Start the development server
npx expo start
```

## Environment Setup

1. Create a `.env` file in the root directory
2. Add your Convex and Clerk configurations:

```
EXPO_PUBLIC_CONVEX_URL=your_convex_deployment_url
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## Usage

After installation, you can run the app on:

- iOS: `npx expo run:ios`
- Android: `npx expo run:android`
- Development: `npx expo start`

## Convex Backend

The app uses Convex for its backend functionality:

- Real-time database updates
- Secure backend functions
- Media storage
- User relationships and feed management

To set up the Convex backend:

```bash
# Install Convex CLI
npm install -g convex

# Login to Convex
npx convex login

# Initialize Convex in your project
npx convex init

# Deploy your backend
npx convex deploy
```

## Authentication with Clerk

Space uses Clerk for a streamlined authentication experience:

- Social login options
- Email and password authentication
- Profile management
- Secure session handling

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Roadmap

- [ ] Implement location-based sharing
- [ ] Add advanced photo editing tools
- [ ] Create custom filters and effects
- [ ] Build analytics dashboard for content performance
- [ ] Support multi-account management

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourhandle) - email@example.com

Project Link: [https://github.com/yourusername/space-react-native](https://github.com/yourusername/space-react-native)

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Convex](https://www.convex.dev/)
- [Clerk](https://clerk.dev/)
- [React Navigation](https://reactnavigation.org/)
