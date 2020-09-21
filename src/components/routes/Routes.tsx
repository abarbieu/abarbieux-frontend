import React from 'react';
import NotesPage from '../notes/NotesPage';
import LaunchMenu from '../../resources/launch-menu.json';
import TreeMenu from '../tree_menu/TreeMenu';
import { MenuNode } from '../tree_menu/TreeMenuApi';
import MyGallery from '../gallery/MyGallery';
import Cover from '../cover/TreeMenuCover';
import AboutMe from '../about/AboutMe';
import ceramicsPhotos from './ceramics-photos.json';
import photos from './photos.json';

import { Switch, Route, Redirect } from 'react-router-dom';

type MyProps = { rootPos: { x: number; y: number } };

function Routes (props: MyProps) {
  const thumbPos = props.rootPos.x > props.rootPos.y ? 'left' : 'bottom';

  return (
    <Switch>
      <Route path='/art/ceramics'>
        <MyGallery thumbPos={thumbPos} photos={ceramicsPhotos} />
      </Route>
      <Route path='/art/photos'>
        <MyGallery thumbPos={thumbPos} photos={photos} />
      </Route>
      <Route path='/art'>
        <MyGallery thumbPos={thumbPos} photos={photos} />
      </Route>
      <Route path='/about'>
        <AboutMe />
      </Route>
      <Route path='/explore'>
        <Cover fading={true} />
        <TreeMenu
          rootPos={props.rootPos}
          spawnRange={{ from: 0.5, to: 2.5 }}
          menu={(LaunchMenu as unknown) as Array<{ [key: string]: MenuNode }>}
        />
      </Route>
      <Route path='/notes/'>
        <NotesPage />
      </Route>
      <Route path='/home/'>
        <Cover fading={false} />
      </Route>
      <Route path='/'>
        <Redirect to='/about/' />
      </Route>
    </Switch>
  );
}

export default Routes;
