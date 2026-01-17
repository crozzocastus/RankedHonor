"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Video, 
  Image as ImageIcon, 
  Mic, 
  FileText, 
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Trophy,
  UserPlus,
  Check
} from 'lucide-react';
import { Post } from '@/types/content';
import { PostInteractions } from '@/components/content/PostInteractions';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ContentCardProps {
  post: Post;
  isActive: boolean;
}

export function ContentCard({ post, isActive }: ContentCardProps) {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(post.isFollowing);

  const getContentTypeIcon = () => {
    switch (post.type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'live':
        return <Radio className="w-4 h-4" />;
      case 'image':
        return <ImageIcon className="w-4 h-4" />;
      case 'audio':
        return <Mic className="w-4 h-4" />;
      case 'text':
        return <FileText className="w-4 h-4" />;
    }
  };

  const getContentTypeBadge = () => {
    switch (post.type) {
      case 'video':
        return 'VÍDEO';
      case 'live':
        return 'AO VIVO';
      case 'image':
        return 'IMAGEM';
      case 'audio':
        return 'ÁUDIO';
      case 'text':
        return 'POST';
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {post.type === 'video' && (
          <div className="relative w-full h-full max-w-2xl mx-auto">
            {post.mediaUrl && (
              <Image
                src={post.mediaUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority={isActive}
                sizes="(max-width: 768px) 100vw, 672px"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            
            {/* Video Controls */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-all border-2 border-white/20"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white" />
              ) : (
                <Play className="w-10 h-10 text-white ml-1" />
              )}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-24 right-6 w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-all border border-white/20"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </button>

            {post.duration && (
              <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20">
                <span className="text-white font-semibold text-sm">{post.duration}</span>
              </div>
            )}
          </div>
        )}

        {post.type === 'live' && (
          <div className="relative w-full h-full max-w-2xl mx-auto">
            {post.mediaUrl && (
              <Image
                src={post.mediaUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority={isActive}
                sizes="(max-width: 768px) 100vw, 672px"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            
            {/* Live Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 rounded-full shadow-lg shadow-red-500/50 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white font-bold text-sm">AO VIVO</span>
            </div>

            {/* Viewer Count */}
            {post.viewerCount && (
              <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="text-white font-semibold text-sm">{post.viewerCount.toLocaleString('pt-BR')} assistindo</span>
              </div>
            )}
          </div>
        )}

        {post.type === 'image' && (
          <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center p-8">
            {post.mediaUrl && (
              <div className="relative w-full h-full">
                <Image
                  src={post.mediaUrl}
                  alt={post.title}
                  fill
                  className="object-contain rounded-lg shadow-2xl"
                  priority={isActive}
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            )}
          </div>
        )}

        {post.type === 'audio' && (
          <div className="relative w-full h-full max-w-2xl mx-auto flex flex-col items-center justify-center p-8">
            {/* Audio Visualizer Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="flex items-end gap-2 h-48">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 bg-gradient-to-t from-orange-500 to-red-600 rounded-t"
                    style={{
                      height: `${Math.random() * 100 + 20}%`,
                      animation: `pulse ${Math.random() * 2 + 1}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Audio Player */}
            <div className="relative z-10 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-12 rounded-2xl border border-gray-700/50 shadow-2xl max-w-lg w-full">
              <div className="flex items-center justify-center mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Mic className="w-16 h-16 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white text-center mb-2">{post.title}</h3>
              <p className="text-gray-400 text-center mb-6">{post.creator.username}</p>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full" style={{ width: '35%' }} />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                <span>1:24</span>
                <span>{post.duration || '3:45'}</span>
              </div>

              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">Reproduzir</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {post.type === 'text' && (
          <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center p-8">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-12 rounded-2xl border border-gray-700/50 shadow-2xl max-h-[80vh] overflow-y-auto">
              <h2 className="text-3xl font-bold text-white mb-6">{post.title}</h2>
              <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Creator Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-32 pb-6 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative w-12 h-12 rounded-full border-2 border-orange-500 shadow-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post.creator.avatar}
                  alt={post.creator.username}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white truncate">{post.creator.username}</h3>
                  {post.creator.isVerified && (
                    <div className="w-5 h-5 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-400">{formatTimeAgo(post.publishedAt)}</span>
                  <span className="text-gray-600">•</span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-800/60 rounded-full border border-gray-700/50">
                    {getContentTypeIcon()}
                    <span className="text-xs text-gray-300 font-medium">{getContentTypeBadge()}</span>
                  </div>
                  {post.isRankedContent && (
                    <>
                      <span className="text-gray-600">•</span>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-500/20 rounded-full border border-orange-500/30">
                        <Trophy className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-orange-500 font-bold">RANQUEADO</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Follow Button */}
            <button
              onClick={() => {
                if (!user) {
                  toast.error('Faça login para seguir criadores');
                  return;
                }
                setIsFollowing(!isFollowing);
              }}
              className={`ml-3 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                isFollowing
                  ? 'bg-gray-800/80 text-gray-300 border border-gray-700/50 hover:bg-gray-700/80'
                  : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-400 hover:to-red-500 shadow-lg shadow-orange-500/20'
              }`}
            >
              {isFollowing ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Seguindo</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Seguir</span>
                </>
              )}
            </button>
          </div>

          <div className="mb-4">
            <p className="text-white text-sm leading-relaxed">{post.description}</p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800/60 text-gray-300 text-xs rounded-full border border-gray-700/50 hover:bg-gray-700/60 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interactions Sidebar */}
      <PostInteractions post={post} />
    </div>
  );
}
