import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PLAYLIST_IDS } from '../constants';

interface YouTubePlayerProps {
  isPlaying: boolean;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ isPlaying }) => {
  const playerRef = useRef<any>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Shuffle playlist on mount
  const [shuffledPlaylist] = useState(() => {
    const list = [...PLAYLIST_IDS];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  });

  const loadNextVideo = useCallback(() => {
    setCurrentVideoIndex((prev) => (prev + 1) % shuffledPlaylist.length);
  }, [shuffledPlaylist.length]);

  useEffect(() => {
    if (!isPlaying) return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player('yt-player', {
          height: '1',
          width: '1',
          videoId: shuffledPlaylist[0],
          playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            loop: 0,
            playsinline: 1, // Essencial para tocar no fundo em mobile
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              event.target.setVolume(40); // Volume ambiente
              event.target.playVideo();
            },
            onStateChange: (event: any) => {
              // 0 means video ended
              if (event.data === 0) {
                loadNextVideo();
              }
            },
          },
        });
      };
    } else if (playerRef.current && playerRef.current.loadVideoById) {
       // Player exists logic handled by next effect
    }
  }, [isPlaying, loadNextVideo, shuffledPlaylist]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(shuffledPlaylist[currentVideoIndex]);
    }
  }, [currentVideoIndex, shuffledPlaylist]);

  return (
    <div className="fixed opacity-0 pointer-events-none -z-50 top-0 left-0">
      <div id="yt-player"></div>
    </div>
  );
};

export default YouTubePlayer;