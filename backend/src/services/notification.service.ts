export const notifyUser = async (
  phone: string,
  message: string
) => {
  console.log(
    `Notification sent to ${phone}`
  );

  console.log(message);

  return true;
};