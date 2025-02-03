import { createContext, useContext, useState, useEffect } from "react";
import useLoading from "../hooks/useLoading";
const FaqContext = createContext();
const TeamContext = createContext();
const RevivewContext = createContext();
const BlogContext = createContext();
const LoaderContext = createContext();
const ApiUpdateContext = createContext();
const ServiceContext = createContext();

export const ContextProvider = ({ children }) => {
  const [faqs, setFaqs] = useState([]);
  const [teams, setTeams] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [apiUpdated, setApiUpdated] = useState({
    faqs: false,
    teams: false,
    reviews: false,
    blogs: false,
    services: false,
  });
  const { setLoading, loading } = useLoading();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/backend8/get-faqs`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          console.error(data.message || "Failed to fetch faqs.");
        } else {
          setLoading(false);
          setFaqs(data.faqs);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };

    fetchFaqs();
  }, [apiUpdated.faqs]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/backend9/getTeams`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          console.error(data.message || "Failed to fetch Teams.");
        } else {
          setLoading(false);
          setTeams(data.teams);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching posts:", error);
      }
    };

    fetchUsers();
  }, [apiUpdated.teams]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/backend10/getReview`);
        const data = await res.json();
        if (!res.ok) {
          console.error(data.message || "Failed to fetch Review.");
        } else {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [apiUpdated.reviews]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/backend11/getBlogs`);
        const data = await res.json();
        if (!res.ok) {
          console.error(data.message || "Failed to fetch blogs.");
        } else {
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchReviews();
  }, [apiUpdated.blogs]);

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const res = await fetch(`api/backend7/get-services`);
        const data = await res.json();
        if (!res.ok) {
          console.error("Failed to fetch services.");
        } else {
          setServices(data.services);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchAllServices();
  }, [apiUpdated.services]);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      <ServiceContext.Provider value={{ services, setServices }}>
        <BlogContext.Provider value={{ blogs, setBlogs, setLoading }}>
          <RevivewContext.Provider value={{ reviews, setReviews, setLoading }}>
            <FaqContext.Provider value={{ faqs, setFaqs, setLoading }}>
              <TeamContext.Provider value={{ teams, setTeams, setLoading }}>
                <ApiUpdateContext.Provider
                  value={{ apiUpdated, setApiUpdated }}
                >
                  {children}
                </ApiUpdateContext.Provider>
              </TeamContext.Provider>
            </FaqContext.Provider>
          </RevivewContext.Provider>
        </BlogContext.Provider>
      </ServiceContext.Provider>
    </LoaderContext.Provider>
  );
};

export const useFaqs = () => useContext(FaqContext);
export const useTeams = () => useContext(TeamContext);
export const useReview = () => useContext(RevivewContext);
export const useBlog = () => useContext(BlogContext);
export const useLoader = () => useContext(LoaderContext);
export const useServices = () => useContext(ServiceContext);
export const useApiUpdate = () => useContext(ApiUpdateContext);
