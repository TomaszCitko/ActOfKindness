import React, { useEffect, useState } from "react";
import { Icon, Pagination } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

function EventPagination() {

  const { eventStore } = useStore();
  const { loadEvents, clearEvents, totalPages, pageNumber } = eventStore;
  const [ activePage, setActivePage] = useState(pageNumber);

  useEffect(() => {
    if (activePage != pageNumber){
      clearEvents();
      loadEvents(activePage);
    }
  }, [activePage, totalPages])

  const onChanged = (event: any, pageInfo: any) => {
    setActivePage(pageInfo.activePage)
  }

  return (
    <Pagination
      defaultActivePage={5}
      ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
      firstItem={{ content: <Icon name="angle double left" />, icon: true }}
      lastItem={{ content: <Icon name="angle double right" />, icon: true }}
      prevItem={{ content: <Icon name="angle left" />, icon: true }}
      nextItem={{ content: <Icon name="angle right" />, icon: true }}
      totalPages={totalPages}
      onPageChange={onChanged}
    />
  );
};

export default EventPagination;
