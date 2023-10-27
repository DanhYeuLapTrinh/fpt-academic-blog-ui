function UnmuteUser({ userId, onUnmute }) {

  const handleUnmute = () => {
    onUnmute(userId);
  }

  return (
    <button onClick={handleUnmute}>Unmute User</button>
  );
}

export default UnmuteUser;