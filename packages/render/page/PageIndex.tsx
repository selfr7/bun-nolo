import { useGetEntryQuery } from 'database/services';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import NoMatch from '../NoMatch';

import CreatePage from './CreatePage';
import { RenderJson } from './RenderJson';
import RenderPage from './RenderPage';
const Page = ({ id }) => {
  const { pageId: paramPageId } = useParams();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const pageId = id || paramPageId;
  const { data, isLoading } = useGetEntryQuery({ entryId: pageId });
  if (isLoading) {
    return <div>loading</div>;
  }
  if (data) {
    if (data.type === 'page') {
      <RenderJson data={data} />;
    }
    if (isEditMode) {
      // 渲染编辑模式的 UI
      return <CreatePage id={pageId} />;
    }
    if (!isEditMode) {
      return <RenderPage pageId={pageId} data={data} />;
    }
  }
  if (!data) {
    return <NoMatch />;
  }
};

export default Page;