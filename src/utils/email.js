import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, USERS, CURRENT_USER, OTHER_USER } from '../config';

// Call this once when the app loads
export function initEmailJS() {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// runType: 'ran' | 'shit_run' | 'break'
// newCount: the sender's updated run count
export async function sendRunEmail(runType, newCount) {
  const sender = USERS[CURRENT_USER];
  const receiver = USERS[OTHER_USER];

  const messages = {
    ran: `${sender.name} ran today 🏃`,
    shit_run: `${sender.name} did it (barely) 😅`,
    break: `${sender.name} took a rest day 🛋️`,
  };

  // Magic link — when receiver taps this, their app syncs the count
  const syncUrl = `${window.location.origin}?sync_user=${CURRENT_USER}&count=${newCount}`;

  const templateParams = {
    to_name: receiver.name,
    to_email: receiver.email,
    from_name: sender.name,
    message: messages[runType],
    sync_url: syncUrl,
    run_count: newCount,
  };

  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );
    return true;
  } catch (err) {
    console.error('EmailJS error:', err);
    return false;
  }
}
