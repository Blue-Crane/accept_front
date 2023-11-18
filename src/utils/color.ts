export const getRoleColor = (accessLevel: number) => {
  switch (accessLevel) {
    case 1:
      return '#2ea3f2';
    case 2:
      return '#1c7ed6';
    case 3:
      return '#aa00ff';
    default:
      return '#ff5050';
  }
};

export const getRatingColor = (rating: number) => {
  switch (rating) {
    case 1:
      return '#FFD700';
    case 2:
      return '#C0C0C0';
    case 3:
      return '#CD7f32';
    default:
      return '';
  }
};
