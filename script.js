// Replace YOUR_API_KEY with your actual YouTube Data API key
const API_KEY = 'AIzaSyBxgkAIJW3Z7qS2TCiTTVURi8n7aK3E2uc';


const playlists = [
    { id: 'PLLaZuHaa4c44paXOKyYyumS3IB75PB6GW', containerId: '1' }, // Minecraft playlist
    { id: 'PLLaZuHaa4c47H0Y9NtrN5K5wRD_gZzDJm', containerId: '2',
      id: 'https://youtube.com/watch?v=l46s16ALFno&si=IG96GJiXIuKjiF_x', containerId: '3' 
}  // Granny playlist
];

// Function to fetch playlist videos
async function fetchPlaylistVideos(playlistId, containerId) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items) {
            displayEmbeddedVideos(data.items, containerId);
        } else {
            console.error(`No items found for playlist ID: ${playlistId}`);
        }
    } catch (error) {
        console.error(`Error fetching playlist videos for ID: ${playlistId}`, error);
    }
}

// Function to display embedded videos on the webpage
function displayEmbeddedVideos(videos, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content

    videos.forEach(video => {
        const videoId = video.snippet.resourceId.videoId;
        const title = video.snippet.title;

        const videoElement = document.createElement('div');
        videoElement.className = 'content';

        videoElement.innerHTML = `
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;

        container.appendChild(videoElement);
    });
}

// Automatically fetch and display videos for all playlists
document.addEventListener('DOMContentLoaded', () => {
    playlists.forEach(playlist => {
        fetchPlaylistVideos(playlist.id, playlist.containerId);
    });
});

