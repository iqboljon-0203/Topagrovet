'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  MessageSquare, Trash2, Eye, EyeOff, CheckCircle,
  Clock, User, Phone, Loader2
} from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  }

  const toggleRead = async (id, currentStatus) => {
    await supabase
      .from('contact_messages')
      .update({ is_read: !currentStatus })
      .eq('id', id);

    setMessages(prev =>
      prev.map(m => m.id === id ? { ...m, is_read: !currentStatus } : m)
    );
  };

  const deleteMessage = async (id) => {
    if (!confirm('Bu xabarni o\'chirmoqchimisiz?')) return;
    setDeleting(id);

    await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    setMessages(prev => prev.filter(m => m.id !== id));
    setDeleting(null);
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.tableSpinner} />
        <span>Xabarlar yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.pageTitleRow}>
            <div className={styles.pageTitleIcon}>
              <MessageSquare size={20} />
            </div>
            <h1 className={styles.pageTitle}>Xabarlar</h1>
            {unreadCount > 0 && (
              <span className={styles.badgeCount}>{unreadCount} yangi</span>
            )}
          </div>
          <p className={styles.pageSubtitle}>
            Saytdan kelgan xabarlar — jami {messages.length} ta
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className={styles.emptyState}>
          <MessageSquare size={48} strokeWidth={1} />
          <h3>Hozircha xabarlar yo&apos;q</h3>
          <p>Sayt orqali yuborilgan xabarlar shu yerda ko&apos;rinadi</p>
        </div>
      ) : (
        <div className={styles.messagesList}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageCard} ${!msg.is_read ? styles.messageUnread : ''}`}
            >
              <div className={styles.messageHeader}>
                <div className={styles.messageSender}>
                  <div className={styles.messageAvatar}>
                    <User size={16} />
                  </div>
                  <div>
                    <div className={styles.messageName}>{msg.name}</div>
                    <div className={styles.messagePhone}>
                      <Phone size={12} /> {msg.phone}
                    </div>
                  </div>
                </div>
                <div className={styles.messageActions}>
                  <div className={styles.messageTime}>
                    <Clock size={12} />
                    {new Date(msg.created_at).toLocaleDateString('uz-UZ', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <button
                    onClick={() => toggleRead(msg.id, msg.is_read)}
                    className={styles.messageActionBtn}
                    title={msg.is_read ? 'O\'qilmagan deb belgilash' : 'O\'qilgan deb belgilash'}
                  >
                    {msg.is_read ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className={`${styles.messageActionBtn} ${styles.messageDeleteBtn}`}
                    title="O'chirish"
                    disabled={deleting === msg.id}
                  >
                    {deleting === msg.id ? (
                      <Loader2 size={15} className={styles.spinnerIcon} />
                    ) : (
                      <Trash2 size={15} />
                    )}
                  </button>
                </div>
              </div>
              <div className={styles.messageBody}>
                {msg.message}
              </div>
              {!msg.is_read && (
                <div className={styles.messageNewBadge}>
                  <CheckCircle size={12} /> Yangi
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
