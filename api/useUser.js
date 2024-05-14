import { useAppContext } from "../context/AppContext";

export const handleAddFriend = async (currentUser, user, chatClient) => {
  console.log("Gửi yêu cầu kết bạn tới", user.name);
  const channel = chatClient.channel("messaging", {
    members: [currentUser.id, user.id],
  });
  const state = await channel.watch();
  const friendRequest = {
    data: {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      friends: currentUser.friends ? currentUser.friends : [],
      recipient: user.id,
      createdAt: new Date(),
    },
  };

  const requests = user.friend_requests ? user.friend_requests : [];

  //Không cho tạo request kết bạn nếu tồn tại
  const existingRequest = requests.some(
    (request) =>
      request.data.id === friendRequest.data.id &&
      request.data.recipient === friendRequest.data.recipient
  );

  if (!existingRequest) {
    const update = await chatClient.partialUpdateUser({
      id: user.id,
      set: {
        friend_requests: [...requests, friendRequest],
      },
    });
    console.log("handleAddFriend" + update);
  } else {
    console.log("Yêu cầu kết bạn đã tồn tại");
  }

  return existingRequest;
};