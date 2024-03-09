import React from "react";
import ProfileCard from "user/blocks/ProfileCard"; // 根据实际路径调整

// 模拟多个人的数据
const peopleData = [
  {
    name: "大白",
    hobbies: "音乐、电影、户外旅行",
    introduction: "农人一个，季节性生意。希望链接到更多有趣的灵魂。",
    location: "湖北孝感",
    visitPlaces: "1. 市里面 2. 村里面",
    stayDescription: "有一个房间，欢迎朋友们留宿。",
    ageRange: "90后",
    gender: "男",
    avatar: "https://via.placeholder.com/150",
    roomImage: "https://via.placeholder.com/400x300",
  },
  // 这里可以继续添加更多
  {
    name: "小红",
    hobbies: "阅读、写作",
    introduction: "作家，喜欢静谧的生活。",
    location: "上海",
    visitPlaces: "书店、咖啡馆",
    stayDescription: "舒适的阅读空间，欢迎交流。",
    ageRange: "80后",
    gender: "女",
    avatar: "https://via.placeholder.com/150",
    roomImage: "https://via.placeholder.com/400x300",
  },
  // 继续添加更多人的信息
];

const People = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 overflow-x-auto p-4">
        {peopleData.map((person, index) => (
          <ProfileCard key={index} {...person} />
        ))}
      </div>
    </div>
  );
};

export default People;
