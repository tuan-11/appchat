async function getToken(id) {
  
  try {
    const response = await fetch('http://192.168.1.5:3000/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: id,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('Token:', data.token);
      return data.token;
    } else {
      // Xử lý lỗi từ phía server
      console.log('Error server:', response.status, data);
      return null;
    }
  } catch (error) {
    // Xử lý lỗi không nhận được phản hồi từ server hoặc lỗi khác
    console.log('Error:', error.message);
    return null;
  }
}
getToken('eulwVMvekvc7VBJsOFVQq231lek1');
module.exports = {
  getToken,
};
