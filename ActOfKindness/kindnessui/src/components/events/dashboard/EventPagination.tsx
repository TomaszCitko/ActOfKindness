import React, { useEffect, useState } from "react";
import { Icon, Pagination } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

function EventPagination() {

  const { eventStore } = useStore();
  const { loadEvents, clearEvents, totalPages, pageNumber, isFiltered, filteredList, loadFilteredEvents } = eventStore;
  const [ activePage, setActivePage] = useState(pageNumber);

  useEffect(() => {
      clearEvents();
      if (!isFiltered){
        loadEvents(activePage);
      }
      else {
        loadFilteredEvents(filteredList, activePage);
      }
  }, [activePage])

  const onChanged = (event: any, pageInfo: any) => {
    setActivePage(pageInfo.activePage)
  }

  return (
    <Pagination
      activePage={pageNumber}
      ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
      firstItem={{ content: <Icon name="angle double left" />, icon: true }}
      lastItem={{ content: <Icon name="angle double right" />, icon: true }}
      prevItem={{ content: <Icon name="angle left" />, icon: true }}
      nextItem={{ content: <Icon name="angle right" />, icon: true }}
      totalPages={totalPages}
      onPageChange={onChanged}
      siblingRange={1}
    />
  );
};

export default observer(EventPagination);
