export default function Label({ forId, text }) {
    return `<label for="${forId}" class="label">${text}</label>`;
  }
