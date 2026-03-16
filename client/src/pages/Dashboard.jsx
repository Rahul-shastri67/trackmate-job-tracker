return (

<Layout>

<div className="space-y-8">

{/* Stats */}
<DashboardStats jobs={jobs}/>


{/* Search + Filter */}

<div className="flex flex-col md:flex-row gap-4">

<JobSearch setSearch={setSearch}/>

<JobFilter setFilter={setFilter}/>

</div>


{/* Job Form */}

<JobForm refreshJobs={loadJobs}/>


{/* Job List */}

{loading ? (

<p className="text-center text-gray-500">
Loading jobs...
</p>

) : (

<JobList
jobs={searchedJobs}
refreshJobs={loadJobs}
/>

)}


{/* Chart */}

<JobChart jobs={jobs}/>

</div>

</Layout>

)