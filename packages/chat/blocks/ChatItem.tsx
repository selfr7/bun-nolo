import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import ChatConfigForm from 'ai/blocks/ChatConfigForm';
import React from 'react';
import { useModal, Dialog, Alert, useDeleteAlert } from 'ui';

const ChatItem = ({
  chat,
  onChatSelect,
  onDeleteChat,
  isSelected,
  allowEdit,
}) => {
  const { visible: editVisible, open: openEdit, close: closeEdit } = useModal();

  const {
    visible: deleteAlertVisible,
    confirmDelete,
    doDelete,
    closeAlert,
    modalState,
  } = useDeleteAlert(() => {
    onDeleteChat(chat);
  });

  return (
    <div
      className={`flex items-center p-4 cursor-pointer group ${
        isSelected ? 'bg-gray-200' : 'hover:bg-gray-200'
      }`}
      onClick={() => onChatSelect(chat)}
    >
      <span className="text-gray-600">{chat.name}</span>
      {allowEdit && (
        <div className="flex opacity-0 group-hover:opacity-100 ml-auto space-x-2">
          <button
            className="text-gray-500 hover:text-blue-500 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              openEdit();
            }}
          >
            <PencilIcon size={16} />
          </button>
          {editVisible && (
            <Dialog isOpen={editVisible} onClose={closeEdit}>
              <ChatConfigForm initialValues={chat} onClose={closeEdit} />
            </Dialog>
          )}
          <button
            className="text-gray-500 hover:text-red-500 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              confirmDelete(chat);
            }}
          >
            <TrashIcon size={16} />
          </button>
          {deleteAlertVisible && (
            <Alert
              isOpen={deleteAlertVisible}
              onClose={closeAlert}
              onConfirm={doDelete}
              title={`删除 ${modalState.name}`}
              message={`你确定要删除 ${modalState.name} 吗？`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatItem;