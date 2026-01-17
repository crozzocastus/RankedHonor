"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Bookmark, Send, X } from 'lucide-react';
import { Post, Comment } from '@/types/content';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';


interface PostInteractionsProps {
  post: Post;
}

export function PostInteractions({ post }: PostInteractionsProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  // Load saved interactions from localStorage
  useEffect(() => {
    const savedInteractions = localStorage.getItem('userInteractions');
    if (savedInteractions) {
      const { likedPosts, savedPosts } = JSON.parse(savedInteractions);
      setIsLiked(likedPosts?.includes(post.id) || false);
      setIsSaved(savedPosts?.includes(post.id) || false);
    }
  }, [post.id]);

  const handleLike = () => {
    if (!user) {
      toast.error('Faça login para curtir');
      return;
    }

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);

    // Save to localStorage
    const savedInteractions = localStorage.getItem('userInteractions');
    const interactions = savedInteractions ? JSON.parse(savedInteractions) : { likedPosts: [], savedPosts: [], followingCreators: [] };
    
    if (newLikedState) {
      interactions.likedPosts = [...(interactions.likedPosts || []), post.id];
    } else {
      interactions.likedPosts = (interactions.likedPosts || []).filter((id: string) => id !== post.id);
    }
    
    localStorage.setItem('userInteractions', JSON.stringify(interactions));
  };

  const handleSave = () => {
    if (!user) {
      toast.error('Faça login para salvar');
      return;
    }

    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    // Save to localStorage
    const savedInteractions = localStorage.getItem('userInteractions');
    const interactions = savedInteractions ? JSON.parse(savedInteractions) : { likedPosts: [], savedPosts: [], followingCreators: [] };
    
    if (newSavedState) {
      interactions.savedPosts = [...(interactions.savedPosts || []), post.id];
    } else {
      interactions.savedPosts = (interactions.savedPosts || []).filter((id: string) => id !== post.id);
    }
    
    localStorage.setItem('userInteractions', JSON.stringify(interactions));
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const interactions = [
    {
      icon: Heart,
      count: likeCount,
      active: isLiked,
      onClick: handleLike,
      label: 'Curtir',
    },
    {
      icon: MessageCircle,
      count: post.comments,
      active: showComments,
      onClick: () => {
        if (!user) {
          toast.error('Faça login para comentar');
          return;
        }
        setShowComments(!showComments);
      },
      label: 'Comentar',
    },
    {
      icon: Share2,
      count: post.shares,
      active: showShare,
      onClick: () => {
        if (!user) {
          toast.error('Faça login para compartilhar');
          return;
        }
        setShowShare(!showShare);
      },
      label: 'Compartilhar',
    },
    {
      icon: Bookmark,
      count: post.saves,
      active: isSaved,
      onClick: handleSave,
      label: 'Salvar',
    },
  ];

  return (
    <>
      {/* Interaction Buttons */}
      <div className="absolute right-6 bottom-32 z-20 flex flex-col gap-4">
        {interactions.map((interaction, index) => (
          <button
            key={index}
            onClick={interaction.onClick}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm ${
                interaction.active
                  ? 'bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30'
                  : 'bg-black/40 hover:bg-black/60 border border-white/20'
              }`}
            >
              <interaction.icon
                className={`w-6 h-6 transition-colors ${
                  interaction.active ? 'text-white' : 'text-white group-hover:text-orange-400'
                }`}
                fill={interaction.active && interaction.icon === Heart ? 'currentColor' : 'none'}
              />
            </div>
            <span className="text-xs text-white font-semibold">
              {formatCount(interaction.count)}
            </span>
          </button>
        ))}
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-black w-full md:max-w-2xl md:rounded-t-2xl md:rounded-b-2xl max-h-[80vh] flex flex-col border-t border-gray-800 md:border">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">Comentários ({post.comments})</h3>
              <button
                onClick={() => setShowComments(false)}
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockComments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="relative w-8 h-8 rounded-full border border-gray-700 overflow-hidden flex-shrink-0">
                    <Image
                      src={comment.avatar}
                      alt={comment.username}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white">{comment.username}</span>
                      <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.text}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="text-xs text-gray-500 hover:text-orange-500 transition-colors">
                        {comment.likes} curtidas
                      </button>
                      <button className="text-xs text-gray-500 hover:text-white transition-colors">
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="p-4 border-t border-gray-800">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full border border-gray-700 overflow-hidden flex-shrink-0">
                    <Image
                      src="https://i.pravatar.cc/150?img=70"
                      alt="Você"
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Adicione um comentário..."
                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 border border-gray-700"
                  />
                  <button className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center hover:from-orange-400 hover:to-red-500 transition-all shadow-lg shadow-orange-500/20">
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400 text-sm mb-3">Faça login para comentar</p>
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-lg hover:from-orange-400 hover:to-red-500 transition-all"
                  >
                    Fazer Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-black w-full md:max-w-md md:rounded-2xl p-6 border-t border-gray-800 md:border">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Compartilhar</h3>
              <button
                onClick={() => setShowShare(false)}
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Handle share action
                    setShowShare(false);
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-all border border-gray-700/50"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center border border-orange-500/30">
                    <option.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{option.label}</p>
                    <p className="text-gray-400 text-xs">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <input
                  type="text"
                  value={`https://forhonor-ranked.com/post/${post.id}`}
                  readOnly
                  className="flex-1 bg-transparent text-gray-400 text-sm focus:outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://forhonor-ranked.com/post/${post.id}`);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-lg hover:from-orange-400 hover:to-red-500 transition-all"
                >
                  Copiar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Mock data for comments
const mockComments: Comment[] = [
  {
    id: '1',
    username: 'WarriorPro',
    avatar: 'https://i.pravatar.cc/150?img=5',
    text: 'Excelente conteúdo! Vou tentar essas técnicas hoje no ranqueado',
    timeAgo: '2h',
    likes: 24,
  },
  {
    id: '2',
    username: 'VikingRaider',
    avatar: 'https://i.pravatar.cc/150?img=15',
    text: 'Finalmente alguém que sabe explicar direito! Inscrito 🔥',
    timeAgo: '5h',
    likes: 18,
  },
  {
    id: '3',
    username: 'NobleKnight',
    avatar: 'https://i.pravatar.cc/150?img=22',
    text: 'Poderia fazer um guia sobre defesa também?',
    timeAgo: '8h',
    likes: 7,
  },
  {
    id: '4',
    username: 'SamuraiLegend',
    avatar: 'https://i.pravatar.cc/150?img=40',
    text: 'Melhor criador de conteúdo de For Honor, sem dúvida',
    timeAgo: '12h',
    likes: 45,
  },
];

// Share options
const shareOptions = [
  {
    icon: Send,
    label: 'Enviar para amigos',
    description: 'Compartilhar via mensagem direta',
  },
  {
    icon: Share2,
    label: 'Compartilhar no feed',
    description: 'Postar no seu perfil',
  },
];
