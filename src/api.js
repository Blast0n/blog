const token = localStorage.getItem('token');
const headers = {
  'Content-Type': 'application/json',
};
if (token) {
  headers.Authorization = `Token ${token}`;
}

export async function getData(page) {
  if (page === 1) {
    page = 0;
  } else {
    page *= 5;
  }
  const url = `https://blog.kata.academy/api/articles?limit=5&offset=${page}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function getSinglePostData(id) {
  const url = `https://blog.kata.academy/api/articles/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function postCreateNewUser(data) {
  const url = 'https://blog.kata.academy/api/users';
  const user = {
    user: {
      username: data.Username,
      email: data.Email,
      password: data.Password,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    return response.json();
  }
  if (response.status === 422) {
    const answer = await response.json();
    const errorMessages = answer.errors;
    const formattedError = Object.entries(errorMessages)
      .map(([key, value]) => `${key} ${value}`)
      .join(', ');
    throw new Error(formattedError);
  }

  throw new Error('An unexpected error occurred');
}

export async function postDoLogin(data) {
  const url = 'https://blog.kata.academy/api/users/login';
  const user = {
    user: {
      email: data.Email,
      password: data.Password,
    },
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    return response.json();
  }
  if (response.status === 422) {
    const answer = await response.json();
    const errorMessages = answer.errors;
    const formattedError = Object.entries(errorMessages)
      .map(([key, value]) => `${key} ${value}`)
      .join(', ');
    throw new Error(formattedError);
  }

  throw new Error('An unexpected error occurred');
}

export async function getUserData() {
  const url = 'https://blog.kata.academy/api/user';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    if (!response.ok) {
      throw new Error('error');
    }

    return await response.json();
  } catch (error) {
    return error.message;
  }
}

export async function putUpdateUser(user) {
  const url = 'https://blog.kata.academy/api/user';
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    return response.json();
  }
  if (response.status === 422) {
    const answer = await response.json();
    const errorMessages = answer.errors;
    const formattedError = Object.entries(errorMessages)
      .map(([key, value]) => `${key} ${value}`)
      .join(', ');
    throw new Error(formattedError);
  }

  throw new Error('An unexpected error occurred');
}

export async function postNewArticle(data) {
  const url = 'https://blog.kata.academy/api/articles';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: data,
    }),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('An unexpected error occurred');
}

export async function putNewPost(obj) {
  const id = obj.slug;
  const data = {
    article: obj.article,
  };
  const url = `https://blog.kata.academy/api/articles/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('An unexpected error occurred');
}

export async function deleteArticle(id) {
  const url = `https://blog.kata.academy/api/articles/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('An unexpected error occurred');
}

export async function favoritesHandler(id, method) {
  const url = `https://blog.kata.academy/api/articles/${id}/favorite`;
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('An unexpected error occurred');
}
