import React from 'react';
import Header from '../todolist/Header';
import TodoList from '../todolist/TodoList';
import LaunchMenu from '../../resources/launch-menu.json';
import TreeMenu from '../tree_menu/TreeMenu';
import MyGallery from '../gallery/MyGallery';
import Cover from '../cover/TreeMenuCover';
import ceramicsPhotos from './ceramics-photos.json';
import photos from './photos.json';

import { Switch, Route, Redirect } from 'react-router-dom';

type MyProps = { rootPos: { x: number; y: number } };

function Routes(props: MyProps) {
  const thumbPos = props.rootPos.x > props.rootPos.y ? 'left' : 'bottom';
  let apiUrl: String;
  if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://127.0.0.1:54321/api/';
  } else {
    apiUrl = 'https://abarbieux.com/api/';
  }
  return (
    <Switch>
      <Route path="/art/ceramics">
        <MyGallery thumbPos={thumbPos} photos={ceramicsPhotos} />
      </Route>
      <Route path="/art/photos">
        <MyGallery thumbPos={thumbPos} photos={photos} />
      </Route>
      <Route path="/art">
        <MyGallery thumbPos={thumbPos} photos={photos} />
      </Route>
      <Route path="/explore">
        <Cover fading={true} />
        <TreeMenu rootPos={props.rootPos} spawnRange={{ from: 0.5, to: 2.5 }} menu={LaunchMenu} />
      </Route>
      <Route path="/notes/">
        <Header />
        <TodoList apiUrl={apiUrl} />
      </Route>
      <Route path="/home/">
        <Cover fading={false} />
      </Route>
      <Route path="/">
        <Redirect to="/home/" />
      </Route>
    </Switch>
  );
}

export default Routes;
