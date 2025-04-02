import React from "react";
import { useTranslation } from "react-i18next";
import FilterSelectList from "../../../../../components/dropDown/FilterSelectList";
import styles from "./CategorySection.module.css";
import { useEffect, useState } from "react";
import { SubCategory, Category } from "../../../../../util/ExampleData";
import { useConversationsContext } from "../../../../../context/ConversationProvider";
import { FilterSelectProps } from "../../../../../components/dropDown/FilterSelect";
import Checkbox from "../../../../../components/button/Checkbox";

interface CategorySectionProps {
  showBackend?: boolean;
  onCategorySelect: (id: number) => void;
  onSubCategorySelect: (id: number) => void;
  defaultSelectedCategory?: number
  defaultSelectedSubCategory?: number
}

const CategorySection: React.FC<CategorySectionProps> = ({
  showBackend = false,
  onCategorySelect,
  onSubCategorySelect,
  defaultSelectedCategory = 0,
  defaultSelectedSubCategory = 0
}) => {
  const { t } = useTranslation();
  const { categories, subCategories } = useConversationsContext();

  const [subCategoryOptions, setSubCategoryOptions] =
    useState<SubCategory[]>(subCategories);
  const [categoryOptions, setCategoryOptions] =
    useState<Category[]>(categories);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategory, setSubSelectedCategory] = useState<number>(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSubCategoryOptions(subCategories);
    setCategoryOptions(categories);
  }, [categories, subCategories]);

  useEffect(() => {
    if (selectedCategory == 0) {
      setSubCategoryOptions(subCategories);
    } else {
      const filteredSubs = subCategories.filter(
        (sub) => sub.category == selectedCategory
      );
      setSubCategoryOptions(filteredSubs);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory != 0) {
      const selected = subCategories.find(
        (sub) => sub.id === selectedSubCategory
      );
      const selectedCat = categories.filter(
        (cat) => cat.id == selected?.category
      );
      if (selectedCategory == 0 || selectedCategory != selected?.category) {
        setCategoryOptions(selectedCat ?? categories);
      }
    } else {
      setCategoryOptions(categories);
    }
  }, [selectedSubCategory]);

  const onCategoryChange = (id: number) => {
    setSelectedCategory(id)
    onCategorySelect(id)
  }

  const onSubCategoryChange = (id: number) => {
    setSubSelectedCategory(id)
    onSubCategorySelect(id)
  }

  const handleCheckboxChange = (checked: boolean) => {
    setChecked(checked);
  };

  const data: FilterSelectProps[] = [
    {
      hint: t("createNewButton.category"),
      options: categoryOptions,
      onChange: onCategoryChange,
      classNameStyle: styles["category_view"],
      selectedId: defaultSelectedCategory
    },
    {
      hint: t("createNewButton.subcategory"),
      options: subCategoryOptions,
      onChange: onSubCategoryChange,
      classNameStyle: styles["category_view"],
      selectedId: defaultSelectedSubCategory
    },
  ];
  return (
    <div className={styles["category-row"]}>
      <FilterSelectList data={data} />
      {showBackend && (
        <div className={styles["rightcol"]}>
          <Checkbox checked={checked} onChange={handleCheckboxChange} />
          <p>Backend</p>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
