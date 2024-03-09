import React from "react";

type ProfileCardProps = {
  name: string;
  hobbies: string;
  introduction: string;
  location: string;
  visitPlaces: string;
  stayDescription: string;
  ageRange: string;
  gender: string;
  avatar: string;
  roomImage: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  hobbies,
  introduction,
  location,
  visitPlaces,
  stayDescription,
  ageRange,
  gender,
  avatar,
  roomImage,
}) => (
  <div className="overflow-hidden rounded bg-white shadow-lg">
    <div className="flex p-4">
      <img className="mr-4 h-16 w-16 rounded-full" src={avatar} alt="头像" />
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold">{name}</div>
            <p className="text-base text-gray-700">现居地：{location}</p>
            <p className="text-base text-gray-700">兴趣爱好：{hobbies}</p>
          </div>
          <div className="text-md">{gender}</div>
        </div>
      </div>
    </div>
    <p className="px-4 text-base text-gray-700">介绍：{introduction}</p>
    <p className="px-4 text-base text-gray-700">参观地点：{visitPlaces}</p>
    <p className="px-4 text-base text-gray-700">住宿介绍：{stayDescription}</p>
    <img className="h-48 w-full object-cover" src={roomImage} alt="房间图片" />
  </div>
);

export default ProfileCard;
